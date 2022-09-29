import { ServiceObject } from "./ServiceObject";
import { SmsType, DeliveryMode } from "./RestaurantSMSSettings";

export class RestaurantSMSLog extends ServiceObject {
    private accountId: string;
    private message: string;
    private recipients: Array<Recipient>;
    private creditUsed: number;
    private sentOn: Date;
    private transactionId: string;
    private smsType: SmsType;
    private deliveryMode: DeliveryMode;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string) {
        this.accountId = accountId;
    }

    public getMesage(): string {
        return this.message;
    }

    public setMesage(message: string) {
        this.message = message;
    }

    public getRecipients(): Array<Recipient> {
        return this.recipients;
    }

    public setRecipients(recipients: Array<Recipient>) {
        this.recipients = recipients;
    }

    public getCreditUsed(): number {
        return this.creditUsed;
    }

    public setCreditUsed(value: number) {
        this.creditUsed = value;
    }

    public getSentOn(): Date {
        return this.sentOn;
    }

    public setSentOn(value: Date) {
        this.sentOn = value;
    }

    public getTransactionId(): string {
        return this.transactionId;
    }

    public setTransactionId(value: string) {
        this.transactionId = value;
    }

    public getSmsType(): SmsType {
        return this.smsType;
    }

    public setSmsType(value: SmsType) {
        this.smsType = value;
    }

    public getDeliveryMode(): DeliveryMode {
        return this.deliveryMode;
    }
    
    public setDeliveryMode(value: DeliveryMode) {
        this.deliveryMode = value;
    }

}

export class Recipient {
    private phoneNumber: number;
    private deliveryStatus: string;
    private message: string;
    private name: string;
    private creditsUsed: number;

    public constructor (phoneNumber?: number) {
        if (phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public setPhoneNumber(value: number) {
        this.phoneNumber = value;
    }

    public getDeliveryStatus(): string {
        return this.deliveryStatus;
    }

    public setDeliveryStatus(value: string) {
        this.deliveryStatus = value;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(value: string) {
        this.message = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getCreditsUsed(): number {
        return this.creditsUsed;
    }
    
    public setCreditsUsed(value: number) {
        this.creditsUsed = value;
    }
}