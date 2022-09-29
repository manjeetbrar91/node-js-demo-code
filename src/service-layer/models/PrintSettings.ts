import { PrinterMapping } from "./PrinterMapping";

export class PrintSettings {
    private enablePrintKOT: KOTPrintPaths;
    private printMessage: string;
    private id: string;
    private accountId: string;
    private printerMappings: Array<PrinterMapping>;
    private enablePrintDeliveryPartners: DeliveryPartnersPrint;
    private localPrinting: boolean;
    private printerWidth: number;
    private printBillEnabledHomeDelivery: boolean;
    private printBillEnabledTakeAway: boolean;
    private printBillEnabledQSR: boolean;

    public isPrintBillEnabledHomeDelivery(): boolean {
        if (this.printBillEnabledHomeDelivery == undefined) {
            this.printBillEnabledHomeDelivery = false;
        }
        return this.printBillEnabledHomeDelivery;
    }

    public setPrintBillEnabledHomeDelivery(printBillEnabledHomeDelivery: boolean): void {
        this.printBillEnabledHomeDelivery = printBillEnabledHomeDelivery;
    }

    public isPrintBillEnabledTakeAway(): boolean {
        if (this.printBillEnabledTakeAway == undefined) {
            this.printBillEnabledTakeAway = false
        }
        return this.printBillEnabledTakeAway;
    }

    public setPrintBillEnabledTakeAway(printBillEnabledTakeAway: boolean): void {
        this.printBillEnabledTakeAway = printBillEnabledTakeAway;
    }

    public isPrintBillEnabledQSR(): boolean {
        if (this.printBillEnabledQSR == undefined) {
            this.printBillEnabledQSR = false;
        }
        return this.printBillEnabledQSR;
    }

    public setPrintBillEnabledQSR(printBillEnabledQSR: boolean): void {
        this.printBillEnabledQSR = printBillEnabledQSR;
    }



    public getPrinterWidth(): number {
        return this.printerWidth;
    }

    public setPrinterWidth(printerWidth: number): void {
        this.printerWidth = printerWidth;
    }

    public isLocalPrinting(): boolean {
        return this.localPrinting;
    }

    public setLocalPrinting(localPrinting: boolean): void {
        this.localPrinting = localPrinting;
    }

    public getEnablePrintDeliveryPartners(): DeliveryPartnersPrint {
        return this.enablePrintDeliveryPartners;
    }

    public setEnablePrintDeliveryPartners(enablePrintDeliveryPartners: DeliveryPartnersPrint): void {
        this.enablePrintDeliveryPartners = enablePrintDeliveryPartners;
    }

    public getPrinterMappings(): Array<PrinterMapping> {
        return this.printerMappings;
    }

    public setPrinterMappings(printerMappings: Array<PrinterMapping>): void {
        this.printerMappings = printerMappings;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getEnablePrintKOT(): KOTPrintPaths {
        return this.enablePrintKOT;
    }

    public setEnablePrintKOT(enablePrintKOT: KOTPrintPaths): void {
        this.enablePrintKOT = enablePrintKOT;
    }

    public getPrintMessage(): string {
        return this.printMessage;
    }

    public setPrintMessage(printMessage: string): void {
        this.printMessage = printMessage;
    }
}

export class DeliveryPartnersPrint {
    private kot: boolean;
    private bill: boolean;

    public isKot(): boolean {
        return this.kot;
    }

    public setKot(kot: boolean): void {
        this.kot = kot;
    }

    public isBill(): boolean {
        return this.bill;
    }

    public setBill(bill: boolean): void {
        this.bill = bill;
    }
}

export class KOTPrintPaths {
    private placeOrder: boolean;
    private editOrder: boolean;

    public isPlaceOrder(): boolean {
        return this.placeOrder;
    }

    public setPlaceOrder(placeOrder: boolean): void {
        this.placeOrder = placeOrder;
    }

    public isEditOrder(): boolean {
        return this.editOrder;
    }

    public setEditOrder(editOrder: boolean): void {
        this.editOrder = editOrder;
    }
}