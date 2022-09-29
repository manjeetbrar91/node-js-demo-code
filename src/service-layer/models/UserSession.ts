import { ServiceObject } from './ServiceObject';
import { UserType, UserRole } from './User';

export class UserSession extends ServiceObject {
     private expiresIn: Number;
     private refreshToken: string;
     private accessToken: string;
     // to be delete soon
     public token: string;
     private userId: string;
     private accountId: string;
     private deviceId: string;
     private userType: UserType;
     private userRoles: UserRole[];
     private permissions: Array<number>;

    public getPermissions(): Array<number> {
        return this.permissions;
    }

    public setPermissions(permissions: Array<number>): void {
        this.permissions = permissions;
    }

     public getAccountId(): string {
          return this.accountId;
     }

     public setAccountId(accountId: string): void {
          this.accountId = accountId;
     }

     public getDeviceId(): string {
          return this.deviceId;
     }

     public setDeviceId(deviceId: string): void {
          this.deviceId = deviceId;
     }

     public getUserRoles(): UserRole[] {
          return this.userRoles;
     }

     public setUserRoles(userRoles: UserRole[]): void {
          this.userRoles = userRoles;
     }

     public getUserType(): UserType {
          return this.userType;
     }

     public setUserType(userType: UserType): void {
          this.userType = userType;
     }


     public getExpiresIn(): Number {
          return this.expiresIn;
     }

     public setExpiresIn(expiresIn: Number): void {
          this.expiresIn = expiresIn;
     }

     public getRefreshToken(): string {
          return this.refreshToken;
     }

     public setRefreshToken(refreshToken: string): void {
          this.refreshToken = refreshToken;
     }

     public getAccessToken(): string {
          return this.accessToken;
     }

     public setAccessToken(accessToken: string): void {
          this.accessToken = accessToken;
          this.token = accessToken;
     }

     public getUserId(): string {
          return this.userId;
     }

     public setUserId(userId: string): void {
          this.userId = userId;
     }
}

