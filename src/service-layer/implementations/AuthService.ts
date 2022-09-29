// external imports
import * as jwt from "jwt-simple";
import { TAlgorithm } from "jwt-simple";
import { ValidationError, validate } from 'class-validator';

// our imports
import { IAuthService } from "../interfaces/IAuthService";
import { IUserService } from "../interfaces/IUserService";
import { ServiceFactory } from "../ServiceFactory";
import { Config } from "../../config/Config";
import { Employee } from "../models/Employee";
import { AccountInfo, AccountType } from "../models/AccountInfo";
import { UserRole, User, UserType } from '../models/User';
import { JWTTokenClaims } from "../models/JWTtokenClaims";
import { Utils } from "../../common/utils/Utils";
import { logger } from '../../logs';
import { CollectionUtils } from '../../common/utils/CollectionUtils';
import { UserSession } from '../models/UserSession';
import { DBManagerFactory } from '../../db-layer/DataAccessLayerFactory';
import { ISessionDBManager } from '../../db-layer/interfaces/ISessionDBManager';
import { ObjectId } from 'bson';
import { Utility } from '../../common/utils/Utility';
import { CustomerSession } from "../models/CustomerSession";
import { Customer } from '../../service-layer/models/Customer';
import { IRolePermissionMappingDBManager } from "../../db-layer/interfaces/IRolePermissionMappingDBManager";
import { IPermissionDBManager } from "../../db-layer/interfaces/IPermissionDBManager";
import { ITenantDBManager } from "../../db-layer/interfaces/ITenantDBManager";
import { Restaurant } from "../../service-layer/models/Restaurant";
import { Role } from "../../service-layer/models/Role";
import { BadRequestError } from 'routing-controllers';


export class AuthService implements IAuthService {
    // Menew admin user 
    public static AdminUserId: string = "5ce595280000000000000000";
    private static AdminUserAccountId: string = "5d0e73a80000000000000000";
    private static AdminUserName: string = "menewAdmin";
    private static AdminPassword: string = "AdMin@MeNeW";
    private static AdminFirstName: string = "Menew Admin";

    private static Algorithm: TAlgorithm = "HS256";

    private readonly userService: IUserService;
    private readonly sessionDBManager: ISessionDBManager;
    private readonly rolePermissionMappingDBManager: IRolePermissionMappingDBManager;
    private readonly permissionDBManager: IPermissionDBManager;
    private readonly tenantDBManager: ITenantDBManager;
    private readonly config: Config;

    constructor() {
        this.userService = ServiceFactory.getUserService();
        this.sessionDBManager = DBManagerFactory.getSessionDBManager();
        this.rolePermissionMappingDBManager = DBManagerFactory.getRolePermissionMappingDBManager();
        this.permissionDBManager = DBManagerFactory.getPermissionDBManager();
        this.tenantDBManager = DBManagerFactory.getTenantDBManager();
        this.config = Config.getInstance();
    }


    public async getCustomerSessionFromCode(code: string): Promise<[CustomerSession, Customer]> {
        let sessions: CustomerSession[] = await this.sessionDBManager.getCustomerSessionFromCode(code);
        if (!sessions || sessions.length == 0) {
            return [null, null];
        }

        // as of now there will be at most only one session of a customer
        const session = sessions[0];

        let customer: Customer = await this.userService.getCustomerById(session.getUserId());

        // Change the role once we have multiple session
        customer.setRoles([UserRole.CustomerAdmin]);
        let role: Role = await this.rolePermissionMappingDBManager.getRoleByRoleName(UserRole.CustomerAdmin);
        customer.setRoleId(role.getId());
        const sessionId: string = Utility.getStringId(new ObjectId());

        const expiresIn: number = this.config.getTokenExpiryInSecs();
        const accountInfo: AccountInfo = new AccountInfo(session.getAccountId(), AccountType.Restaurant);
        let rolePermissionMapping = await this.getPermissions(customer.getRoleId(), accountInfo.getAccountId());
        let accessToken: string = this.getAccessToken(accountInfo, customer, sessionId, expiresIn, rolePermissionMapping);
        session.setAccessToken(accessToken);
        session.setPermissions(rolePermissionMapping);
        if (!customer) {
            return [session, null]
        }
        customer.setRoles(session.getUserRoles());
        return [session, customer];
    }

    private async getPermissions(roleId, accountId) {
        //get roles from roleId then check if its active, get roleId mapping permissions, then get permissions n return all active permissions
        let role: Role = await this.rolePermissionMappingDBManager.getRoleForRoleId(roleId);
        if (role) {
            let restaurant: Restaurant = await this.tenantDBManager.getRestaurantById(accountId);
            if (!restaurant) {
                throw new BadRequestError(`Restaurant id ${accountId} does not exist !`)
            }
            let rolePermissionMapping = await this.rolePermissionMappingDBManager.getPermissionMappingForRoleId(roleId, accountId, restaurant.getTenant().getId());
            let permissions = await this.permissionDBManager.getPermissions();
            //compare if mapped permissions are in promotion
            let permissionOrders = [];
            for (let permission of rolePermissionMapping.getPermissions()) {
                permissionOrders.push(this.filterByString(permissions, permission.getId()));
            }
            return permissionOrders;
        }
    }

    private filterByString(data, s) {
        let result = data.filter(e => e.getId().includes(s));
        return result[0].getOrder();
    }

    public async createCustomerSession(accountInfo: AccountInfo, user: User, orderId: string): Promise<CustomerSession> {
        const session = new CustomerSession();
        await this.setUserSession(session, accountInfo, user);
        session.setOrderId(orderId);


        while (true) {
            try {
                // generate 6 digit code
                session.setCode(Utils.getAlphaNumericString(6));
                // save to db
                await this.sessionDBManager.createCustomerSession(session);
                break;
            }
            catch (error) {
                // Code to handle exception
                if (error.code == 11000) {
                    logger.warn("Generated duplicated code for order id: %s code: %s. Trying again with new code.", orderId, session.getCode());
                    continue
                }
                else {
                    throw error;
                }

            }
        }
        return session;
    }

    public async createSession(accountInfo: AccountInfo, user: User): Promise<UserSession> {
        const session = new UserSession();
        await this.setUserSession(session, accountInfo, user);
        // save to db
        await this.sessionDBManager.createUserSession(session);
        return session;
    }

    private async setUserSession(session: UserSession, accountInfo: AccountInfo, user: User): Promise<UserSession> {
        const sessionId: string = Utility.getStringId(new ObjectId());
        const expiresIn: number = this.config.getTokenExpiryInSecs();
        let rolePermissionMapping = await this.getPermissions(user.getRoleId(), accountInfo.getAccountId());
        let accessToken: string = this.getAccessToken(accountInfo, user, sessionId, expiresIn, rolePermissionMapping);

        // Create user session and store into database for further logins
        session.setId(sessionId);
        session.setUserType(user.getUserType());
        session.setUserRoles(user.getRoles());
        session.setUserId(user.getId());
        session.setAccountId(accountInfo.getAccountId());
        session.setRefreshToken(this.getRefreshToken(user.getId()));
        // set other fields
        session.setAccessToken(accessToken);
        session.setPermissions(rolePermissionMapping);
        session.setExpiresIn(expiresIn);
        return session;
    }

    public async updateUserSession(session: UserSession): Promise<UserSession> {
        return await this.sessionDBManager.updateUserSession(session);
    }

    public async getSessionFromRefreshToken(refreshToken: string): Promise<[UserSession, Employee]> {
        let session: UserSession = await this.sessionDBManager.getUserSessionFromRefreshToken(refreshToken);
        if (!session) {
            return [null, null];
        }
        // generate new refresh token and save to db
        session.setRefreshToken(this.getRefreshToken(session.getUserId()));
        session = await this.updateUserSession(session);

        let employee: Employee = await this.userService.getEmployeeById(session.getUserId());
        if (!employee) {
            return [session, null]
        }

        const expiresIn: number = this.config.getTokenExpiryInSecs();
        let rolePermissionMapping = await this.getPermissions(employee.getRoleId(), employee.getAccountInfo().getAccountId());
        let accessToken: string = this.getAccessToken(employee.getAccountInfo(), employee, session.getId(), expiresIn, rolePermissionMapping);
        session.setAccessToken(accessToken);
        session.setPermissions(rolePermissionMapping);
        session.setExpiresIn(expiresIn);

        return [session, employee];
    }

    public getMenewAdminUser(): Employee {
        let employee: Employee = new Employee();
        employee.setId(AuthService.AdminUserId);
        employee.setAccountInfo(new AccountInfo(AuthService.AdminUserAccountId, AccountType.MenewPlatform))
        employee.setFirstName(AuthService.AdminFirstName);
        employee.setUserName(AuthService.AdminUserName);
        employee.setPassword(AuthService.AdminPassword);
        // give admin permissions
        employee.setRoles([UserRole.MenewAdmin]);
        return employee;
    }

    public async getUser(jwtToken: string): Promise<User> {
        let claims: JWTTokenClaims = await this.getClaims(jwtToken);
        if (!claims) {
            return null;
        }
        let user: User = null;
        if (claims.getUserId() == AuthService.AdminUserId) { // Admin
            user = this.getMenewAdminUser();
        }
        else if (claims.getUserType() == UserType.Customer) { // Customer
            user = await this.userService.getCustomerById(claims.getUserId());
        }
        else { // Employees
            user = await this.userService.getEmployeeById(claims.getUserId());
        }
        if (user == undefined || user == null) {
            return null;
        }
        // add claim roles
        user.setRoles(claims.getRoles());
        user.setAccountInfo(claims.getAccountInfo());

        if (user.getRoleId()) {
            user.setRoleId(user.getRoleId());
        } else {
            let role: Role = await this.rolePermissionMappingDBManager.getRoleByRoleName(user.getRoles[0]);
            user.setRoleId(role.getId());
        }
        return user;
    }

    private async getClaims(jwtToken: string): Promise<JWTTokenClaims> {
        let decodedPayload = jwt.decode(
            jwtToken,
            Config.getInstance().getSecretKey(),
            true,
            AuthService.Algorithm
        );
        return AuthService.fromJWTPayload(decodedPayload);
    }

    private getAccessToken(accountInfo: AccountInfo, user: User, sessionId: string, expiresIn: number, permissions: Array<number>): string {
        let claims: JWTTokenClaims = new JWTTokenClaims(
            user.getId(),
            sessionId,
            expiresIn,
            user.getUserType(),
            user.getRoles(),
            accountInfo,
            permissions
        );
        return this.getJWTToken(claims);
    }

    private getRefreshToken(userId: string): string {
        return Utils.toBase64(userId + "." + Utils.getUniqueId());
    }

    private getJWTToken(claims: JWTTokenClaims): string {
        let jwtToken = jwt.encode(
            AuthService.toJWTPayload(claims),
            Config.getInstance().getSecretKey(),
            AuthService.Algorithm
        );
        return jwtToken;
    }

    private static toJWTPayload(claims: JWTTokenClaims): any {
        return {
            aud: claims.getUserId(),
            exp: claims.getExpiresAt(),
            r: claims.getRoles(),
            pers: claims.getPermissions(),
            sid: claims.getSessionId(),
            aid: claims.getAccountInfo().getAccountId(),
            ut: claims.getUserType(),
            at: claims.getAccountInfo().getAccountType(),
        }
    }

    private static async fromJWTPayload(payload: any): Promise<JWTTokenClaims> | undefined {
        const expiresAt: number = payload.exp;
        const expiresIn: number = Math.floor(new Date(expiresAt).getTime() - new Date().getTime() / 1000);
        if (expiresIn <= 0) { // expiry of token
            return undefined;
        }

        let userId: string = payload.aud;
        let permissions: Array<number> = payload.pers;
        let userType: UserType = Utils.parseDefaultEnum(payload.ut, UserType, UserType.Unknown);
        let roles: Array<UserRole> = Utils.parseDefaultEnumMulti(payload.r, UserRole, UserRole.Unknown);
        let sessionId: string = payload.sid;
        let accountId: string = payload.aid;
        let accountType: AccountType = Utils.parseDefaultEnum(payload.at, AccountType, AccountType.Unknown);

        if (accountType == AccountType.Unknown) {
            return undefined;
        }

        let claims: JWTTokenClaims = new JWTTokenClaims(userId, sessionId, expiresIn, userType, roles, new AccountInfo(accountId, accountType), permissions);
        claims.setExpiresAt(expiresAt);
        let errors: ValidationError[] = await validate(claims);
        if (errors.length > 0) {
            logger.warn("JWT token validation failed errors %s", errors);
            return undefined;
        }
        return claims;
    }
}