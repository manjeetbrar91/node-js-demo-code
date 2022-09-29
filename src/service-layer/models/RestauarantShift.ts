import { ServiceObject } from "./ServiceObject";

export class RestaurantShift extends ServiceObject {
    private accountId: string;
    private name: string;
    private startTime: string;
    private endTime: string;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }
    
    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setStartTime(startTime: string): void {
        this.startTime = startTime;
    }

    public getStartTime(): string {
        return this.startTime;
    }

    public setEndTime(endTime: string): void {
        this.endTime = endTime;
    }

    public getEndTime(): string {
        return this.endTime;
    }
}