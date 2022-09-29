import { ServiceObject } from './ServiceObject';

export class NotificationSubscription extends ServiceObject {
  private subscription: Object;
  private deviceId: string;
  private accountId: string;
  private roleId: string;
  private userId: string;

    public getRoleId(): string {
        return this.roleId;
    }

    public setRoleId(roleId: string): void {
        this.roleId = roleId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getSubscription(): Object {
        return this.subscription;
    }

    public setSubscription(subscription: Object): void {
        this.subscription = subscription;
    }

    public getDeviceId(): string {
        return this.deviceId;
    }

    public setDeviceId(deviceId: string): void {
        this.deviceId = deviceId;
    }

    public getRestaurantId(): string {
        return this.accountId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.accountId = restaurantId;
    }
}