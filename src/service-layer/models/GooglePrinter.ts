import { ServiceObject } from "./ServiceObject";
import { GooglePrinterInfo } from "./PrinterInfo";

export class GooglePrinter extends ServiceObject {
    private googlePrinterInfo: GooglePrinterInfo;
    private accountId: string;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getGooglePrinterInfo(): GooglePrinterInfo {
        return this.googlePrinterInfo;
    }

    public setGooglePrinterInfo(googlePrinterInfo: GooglePrinterInfo): void {
        this.googlePrinterInfo = googlePrinterInfo;
    }

}