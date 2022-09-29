import { ServiceObject } from "./ServiceObject";

export class KitchenDisplayMappping extends ServiceObject{
    private userId: string;
    private tables: Array<string>;
    private tag: string;
    private accountId: string;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getTables(): Array<string> {
        return this.tables;
    }

    public setTables(tables: Array<string>): void {
        this.tables = tables;
    }

    public getTag(): string {
        return this.tag;
    }

    public setTag(tag: string): void {
        this.tag = tag;
    }
}