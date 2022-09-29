import { Action, UnauthorizedError } from 'routing-controllers';
import { ServiceFactory } from '../../service-layer/ServiceFactory';
import { User, RolePermissions } from "../../service-layer/models/User";
import { logger } from '../../logs';
import { Employee } from '../../service-layer/models/Employee';
import { DBManagerFactory } from '../../db-layer/DataAccessLayerFactory';
import { Restaurant } from '../../service-layer/models/Restaurant';

export class AuthorizationChecker {
    private static extractJWTToken(action: Action): string {
        let token: string = action.request.headers["authorization"] || action.request.headers["Authorization"] ;
        if(!token){
            return token;
        }
        token = token.replace('Bearer', "").trim();
        return token;
    }

    public async check(action: Action, roles: RolePermissions[]): Promise<boolean> {
        // // TODO: move below to aap ts configuration
        if (action.request.path === '/menu/updateDeliveryStatus') {
            return action.request.headers["authorization"] && 'WMDNTyMwybkT5A9v!XPuTT?y$G!hp4' === action.request.headers["authorization"];
        }

        let jwtToken: string = AuthorizationChecker.extractJWTToken(action);
        if(jwtToken == undefined){
            action.request.user = ServiceFactory.getAuthService().getMenewAdminUser();
            return true;
            // to maintain backward compatibility of code not parsing and checking access token
            // throw new UnauthorizedError("Access token is not provided");
        }
        let user: User = await ServiceFactory.getAuthService().getUser(jwtToken);
    
        if(!user){
            throw new UnauthorizedError("Invalid access token");
        }
        //get roleId from user then get mapped permissions to user
        // let restaurant: Restaurant = await DBManagerFactory.getTenantDBManager().getRestaurantById(user.getAccountInfo().getAccountId());
        // let mappedPermissions = await DBManagerFactory.getRolePermissionMappingDBManager().getPermissionMappingForRoleId(user.getRoleId(), user.getAccountInfo().getAccountId(), restaurant.getTenant().getId());
        let permissionOrders =[];
        // for(let permission of mappedPermissions.getPermissions()){
        //     permissionOrders.push(permission.getOrder());
        // }

        for(let role of roles){
            if (permissionOrders.some(p => p === role)) {
                // save user information in request context for further usages.
                action.request.user = user;
                return true;
            }
        }
        
        logger.warn("Unauthorized user trying to access API. roles required=%s user found= %s, path=%s",
            roles, user, action.request.baseUrl);

        // it will throw http error code 403 
        return false;
    }

    private containsAny(source,target){
        var result = source.filter(function(item){ return target.indexOf(item) > -1});   
        return (result);
    }   

    public async getCurrentUserClaims(action: Action): Promise<Employee> {  
        return action.request.user;
    }
} 