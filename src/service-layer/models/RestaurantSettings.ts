//TODO remove it
import { ServiceObject } from "./ServiceObject";

export class RestaurantSettings extends ServiceObject{
    private accountId: string;
    private enablePrintScreen: boolean;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public isEnablePrintScreen(): boolean {
        return this.enablePrintScreen;
    }

    public setEnablePrintScreen(enablePrintScreen: boolean): void {
        this.enablePrintScreen = enablePrintScreen;
    }
}