import { IsMongoId, IsString, IsEnum, IsPositive, IsDefined, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";

import { UserRole, UserType } from './User';
import { AccountInfo } from './AccountInfo';

export class JWTTokenClaims {
    @IsMongoId()
    private userId: string;

    @IsString()
    private sessionId: string;

    @IsArray()
    private permissions: Array<number>;

    @IsPositive()
    private expiresAt: number;

    // @IsEnum(UserType)
    @IsString()
    private userType: string;

    @IsEnum(UserRole, { each: true })
    private roles: Array<UserRole>;

    @IsDefined()
    @ValidateNested()
    @Type(() => AccountInfo)
    private accountInfo: AccountInfo;

    public constructor(userId: string, sessionId: string, expiryTimeInSecs: number,
        type: string, roles: Array<UserRole>, accountInfo: AccountInfo, permissions: Array<number>) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.expiresAt = Math.floor(Date.now() / 1000) + expiryTimeInSecs;
        this.userType = type;
        this.roles = roles;
        this.accountInfo = accountInfo;
        this.permissions = permissions;
    }

    public getPermissions(): Array<number> {
        return this.permissions;
    }

    public setPermissions(permissions: Array<number>): void {
        this.permissions = permissions;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getSessionId(): string {
        return this.sessionId;
    }

    public setSessionId(sessionId: string): void {
        this.sessionId = sessionId;
    }

    public getRoles(): Array<UserRole> {
        return this.roles;
    }

    public setRoles(roles: Array<UserRole>): void {
        this.roles = roles;
    }

    public getAccountInfo(): AccountInfo {
        return this.accountInfo;
    }

    public setAccountInfo(accountInfo: AccountInfo): void {
        this.accountInfo = accountInfo;
    }

    public getExpiresAt(): number {
        return this.expiresAt;
    }

    public setExpiresAt(expiresAt: number): void {
        this.expiresAt = expiresAt;
    }

    public getUserType(): string {
        return this.userType;
    }

    public setUserType(type: UserType): void {
        this.userType = type;
    }
}