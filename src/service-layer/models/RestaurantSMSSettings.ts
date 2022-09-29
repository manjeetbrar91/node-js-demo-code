import { ServiceObject } from "./ServiceObject";
import { AccountType } from "./AccountInfo";

export class RestaurantSMSSettings extends ServiceObject {
    private accountId: string;
    private accountType: AccountType;
    private credit: number;
    private creditExpiry: Date;
    private senderId: string;
    private isEnabled: boolean;
    private smsConfiguration: Array<SmsConfiguration>

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountType(accountType: AccountType): void {
        this.accountType = accountType
    }

    public getAccountType(): AccountType {
        return this.accountType;
    }

    public setCredit(credit: number): void {
        this.credit = credit;
    }

    public getCredit(): number {
        return this.credit;
    }

    public setSmsConfiguration(messageConfiguration: Array<SmsConfiguration>): void {
        this.smsConfiguration = messageConfiguration;
    }

    public getSmsConfiguration(): Array<SmsConfiguration> {
        return this.smsConfiguration;
    }

    public getCreditExpiry(): Date {
        return this.creditExpiry;
    }
    
    public setCreditExpiry(value: Date) {
        this.creditExpiry = value;
    }

    public getsenderId(): string {
        return this.senderId;
    }
    public setsenderId(value: string) {
        this.senderId = value;
    }

    public getIsEnabled(): boolean {
        return this.isEnabled;
    }
    public setIsEnabled(value: boolean) {
        this.isEnabled = value;
    }
}

export class SmsConfiguration {
    public channel: string;
    public smsType: SmsType;
    private templateName: string;
    public isEnabled: boolean;
    private template: string;
    private description: string;
    private deliveryMode: DeliveryMode;  

    public setChannel(channel: string): void {
        this.channel = channel;
    }

    public getChannel(): string {
        return this.channel;
    }

    public setSmsType(messageType: SmsType): void {
        this.smsType = messageType;
    }

    public getSmsType(): SmsType {
        return this.smsType;
    }

    public setIsEnabled(isEnabled: boolean): void {
        this.isEnabled = isEnabled;
    }

    public getIsEnabled(): boolean {
        return this.isEnabled;
    }

    public gettemplate(): string {
        return this.template;
    }

    public settemplate(value: string) {
        this.template = value;
    }

    public getdescription(): string {
        return this.description;
    }

    public setdescription(value: string) {
        this.description = value;
    }

    public getTemplateName(): string {
        return this.templateName;
    }

    public setTemplateName(value: string) {
        this.templateName = value;
    }

    public getDeliveryMode(): DeliveryMode {
        return this.deliveryMode;
    }

    public setDeliveryMode(value: DeliveryMode) {
        this.deliveryMode = value;
    }
}

export enum SmsType {
    Welcome = "welcome",
    CustomerPlacedOrder = "customerPlacedOrder",
    DeliveryLocationDetails = "deliverylocatiobdetails",
    ThankYou = "thankYou",
    SendBill = "sendBill",
    HomeDeliveryPlaced = "homeDeliveryPlaced",
    HomeDeliveryConfirmed = "homeDeliveryConfirmed",
    HomeDeliveryPickedUp = "homeDeliveryPickedUp",
    HomeDeliveryFoodReady = "homeDeliveryFoodReady",
    HomeDeliveryFoodReadyBill = "homeDeliveryFoodReadyBill",
    HomeDeliveryFoodReadyToExecutive = "homeDeliverySMSToExecutive",
    HomeDeliveryDelivered = "homeDeliveryDelivered",
    QsrOrderPlaced = "qsrOrderPlaced",
    TakeAwayPlaced = "takeAwayPlaced",
    TakeAwayConfirmed = "takeAwayConfirmed",
    TakeAwayFoodReady = "takeAwayFoodReady",
    TakeAwayFeedback = "takeAwayFeedback",
    TakeAwayCancelled = "takeAwayCancelled",
    HomeDeliveryCancelled = "homeDeliveryCancelled",
    theatreApprovedPickUp = "theatreApprovedPickUp",
    theatreApprovedSeatDelivery = "theatreApprovedSeatDelivery",
    theatreOutForDelivery = "theatreOutForDelivery",
    theatreReadyForPickup = "theatreReadyForPickup",
    theatreCompleted = "theatreCompleted",
    theatreCancelled = "theatreCancelled",
    DailySummary = "dailySummary",
    Otp = "otp",
    Manual = "manual",
    Unknown = "unknown"
}

export enum DeliveryMode {
    Automated = "automated",
    Manual = "manual",    
    Unknown = "unknown"
}