import { ServiceObject } from './ServiceObject';

export enum DiscountRecurrenceType {
    Unknown = "unknown",
    Daily = "daily",
}

export enum DiscountType {
    Unknown = "unknown",
    Percentage = "percentage",
    FixedAmount = "fixedAmount",
    BuyXGetY = "buyxgety"
}

export enum DiscountSubType {
    Unknown = "unknown",
    Discount = "discount",
    Promotion = "promotion",
}

export class Discount extends ServiceObject {
    private accountId: string;
    private accountType: string;
    private startTime: Date;
    private endTime: Date;
    private recurrence: DiscountRecurrenceType;
    private discountType: DiscountType;
    private discountSubType: DiscountSubType;
    /*following is a flexible json schema for which will depend on discountType. For eg:
    For order level flat discount, it will contain minOrder amount, discountAmount
    For order level percent discount, it will contain minOrder amount, discountPercent
    For item level flat discount, it will contain itemId, discountAmount
    For item level percent discount, it will contain itemId, discountPercent
    For items free with item, it will contain itemId to be ordered to get free Array<ItemIds> 
    */
    private discountMetadata: any;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getAccountType(): string {
        return this.accountType;
    }

    public setAccountType(accountType: string): void {
        this.accountType = accountType;
    }

    public getStartTime(): Date {
        return this.startTime;
    }

    public setStartTime(startTime: Date): void {
        this.startTime = startTime;
    }

    public getEndTime(): Date {
        return this.endTime;
    }

    public setEndTime(endTime: Date): void {
        this.endTime = endTime;
    }

    public getRecurrence(): DiscountRecurrenceType {
        return this.recurrence;
    }

    public setRecurrence(recurrence: DiscountRecurrenceType): void {
        this.recurrence = recurrence;
    }

    public getDiscountType(): DiscountType {
        return this.discountType;
    }

    public setDiscountType(discountType: DiscountType): void {
        this.discountType = discountType;
    }

    public getDiscountSubType(): DiscountSubType {
        return this.discountSubType;
    }

    public setDiscountSubType(discountSubType: DiscountSubType): void {
        this.discountSubType = discountSubType;
    }

    public getDiscountMetadata(): any {
        return this.discountMetadata;
    }

    public setDiscountMetadata(discountMetadata: any): void {
        this.discountMetadata = discountMetadata;
    }
}

