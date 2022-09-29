import { DailySummaryContacts } from "./DailySummaryContacts";

export class GeneralSettings {
    // general settings for restaurant
    private billDiscountEnabled: boolean;
    private billCancelEnabled: boolean;
    private secrectPin: string;
    private customerDetailCompulsoryEnabled: boolean;
    private dailySummaryContacts: Array<DailySummaryContacts>;
    private includeTaxInPrice: boolean;
    private restaurantMode: RestaurantMode;
    private testOrderLimit: number;
    private toggleNotifications: boolean;
    private sendSMSOnDiscount: boolean;
    private sendDiscountSMSTo: number;
    private addDiscountWithCred: boolean;
    private hideCustomItemOption: boolean;
    private billPrintingMandatory: boolean;
    private allowPrinterSeletion: boolean;
    private adultChildInfoMandatory: boolean;
    private customerDetailCompulsoryEnabledQROrder: boolean;
    private readOnlyMenuQSR: boolean;
    private readOnlyMenuDineIn: boolean;
    private billCancelMultipleEnabled: boolean;

    public isBillCancelMultipleEnabled(): boolean {
        return this.billCancelMultipleEnabled;
    }

    public setBillCancelMultipleEnabled(billCancelMultipleEnabled: boolean): void {
        this.billCancelMultipleEnabled = billCancelMultipleEnabled;
    }

    
    public isReadOnlyMenuQSR(): boolean {
        return this.readOnlyMenuQSR;
    }
    
    public setReadOnlyMenuQSR(readOnlyMenuQSR: boolean): void {
        this.readOnlyMenuQSR = readOnlyMenuQSR;
    }
    
    public isReadOnlyMenuDineIn(): boolean {
        return this.readOnlyMenuDineIn;
    }
    
    public setReadOnlyMenuDineIn(readOnlyMenuDineIn: boolean): void {
        this.readOnlyMenuDineIn = readOnlyMenuDineIn;
    }


    public isCustomerDetailCompulsoryEnabledQROrder(): boolean {
        return this.customerDetailCompulsoryEnabledQROrder;
    }

    public setCustomerDetailCompulsoryEnabledQROrder(customerDetailCompulsoryEnabledQROrder: boolean): void {
        this.customerDetailCompulsoryEnabledQROrder = customerDetailCompulsoryEnabledQROrder;
    }


    public isAdultChildInfoMandatory(): boolean {
        return this.adultChildInfoMandatory;
    }

    public setAdultChildInfoMandatory(adultChildInfoMandatory: boolean): void {
        this.adultChildInfoMandatory = adultChildInfoMandatory;
    }


    public isAllowPrinterSeletion(): boolean {
        return this.allowPrinterSeletion;
    }

    public setAllowPrinterSeletion(allowPrinterSeletion: boolean): void {
        this.allowPrinterSeletion = allowPrinterSeletion;
    }


    public isBillPrintingMandatory(): boolean {
        return this.billPrintingMandatory;
    }

    public setBillPrintingMandatory(billPrintingMandatory: boolean): void {
        this.billPrintingMandatory = billPrintingMandatory;
    }


    public isHideCustomItemOption(): boolean {
        return this.hideCustomItemOption;
    }

    public setHideCustomItemOption(hideCustomItemOption: boolean): void {
        this.hideCustomItemOption = hideCustomItemOption;
    }

    public isAddDiscountWithCred(): boolean {
        return this.addDiscountWithCred;
    }

    public setAddDiscountWithCred(addDiscountWithCred: boolean): void {
        this.addDiscountWithCred = addDiscountWithCred;
    }

    public isSendSMSOnDiscount(): boolean {
        return this.sendSMSOnDiscount;
    }

    public setSendSMSOnDiscount(sendSMSOnDiscount: boolean): void {
        this.sendSMSOnDiscount = sendSMSOnDiscount;
    }

    public getSendDiscountSMSTo(): number {
        return this.sendDiscountSMSTo;
    }

    public setSendDiscountSMSTo(sendDiscountSMSTo: number): void {
        this.sendDiscountSMSTo = sendDiscountSMSTo;
    }

    public isToggleNotifications(): boolean {
        return this.toggleNotifications;
    }

    public setToggleNotifications(toggleNotifications: boolean): void {
        this.toggleNotifications = toggleNotifications;
    }

    public getTestOrderLimit(): number {
        return this.testOrderLimit;
    }

    public setTestOrderLimit(testOrderLimit: number): void {
        this.testOrderLimit = testOrderLimit;
    }

    public getRestaurantMode(): RestaurantMode {
        return this.restaurantMode;
    }

    public setRestaurantMode(mode: RestaurantMode): void {
        this.restaurantMode = mode;
    }

    public getIncludeTaxInPrice(): boolean {
        return this.includeTaxInPrice;
    }

    public setIncludeTaxInPrice(includeTaxInPrice: boolean): void {
        this.includeTaxInPrice = includeTaxInPrice;
    }

    public isBillDiscountEnabled(): boolean {
        return this.billDiscountEnabled;
    }

    public setBillDiscountEnabled(billDiscountEnabled: boolean): void {
        this.billDiscountEnabled = billDiscountEnabled;
    }

    public isBillCancelEnabled(): boolean {
        return this.billCancelEnabled;
    }

    public setBillCancelEnabled(billCancelEnabled: boolean): void {
        this.billCancelEnabled = billCancelEnabled;
    }
 
    public getSecrectPin(): string {
        return this.secrectPin;
    }

    public setSecrectPin(secrectPin: string): void {
        this.secrectPin = secrectPin;
    }
    
    public isCustomerDetailCompulsoryEnabled(): boolean {
        return this.customerDetailCompulsoryEnabled;
    }

    public setCustomerDetailCompulsoryEnabled(customerDetailCompulsoryEnabled: boolean): void {
        this.customerDetailCompulsoryEnabled = customerDetailCompulsoryEnabled;
    }

    public getDailySummaryContacts(): Array<DailySummaryContacts> {
        return this.dailySummaryContacts;
    }

    public setDailySummaryContacts(dailySummaryContacts: Array<DailySummaryContacts>): void {
        this.dailySummaryContacts = dailySummaryContacts;
    }
}

export enum RestaurantMode {
    Test = "test",
    Live = "live"
}