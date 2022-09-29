import { ExtendedTypeValue } from "./extendedtypes/ExtendedType";
import { ServiceObject } from './ServiceObject';

export class ItemFeedback {
    private itemId: string;
    private itemName: string;
    private isVeg: boolean;
    private experience: ExtendedTypeValue;
    private strengths: ExtendedTypeValue[];

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public isIsVeg(): boolean {
        return this.isVeg;
    }

    public setIsVeg(isVeg: boolean): void {
        this.isVeg = isVeg;
    }
    
    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getExperience(): ExtendedTypeValue {
        return this.experience;
    }

    public setExperience(experience: ExtendedTypeValue): void {
        this.experience = experience;
    }

    public getStrengths(): Array<ExtendedTypeValue> {
        return this.strengths;
    }

    public setStrengths(strengths: Array<ExtendedTypeValue>): void {
        this.strengths = strengths;
    }
}
export class Feedback extends ServiceObject{
    private customerId: string;
    private accountId: string;
    private orderId: string;
    private comments: string;
    private platformBased: ExtendedTypeValue;
    private orderBased: ExtendedTypeValue;;
    private itemBased: ItemFeedback[];
    private orderBasedelectedOptions: ExtendedTypeValue[];

    public getOrderBasedelectedOptions(): ExtendedTypeValue[] {
        return this.orderBasedelectedOptions;
    }

    public setOrderBasedelectedOptions(orderBasedelectedOptions: ExtendedTypeValue[]): void {
        this.orderBasedelectedOptions = orderBasedelectedOptions;
    }

    public getPlatformBased(): ExtendedTypeValue {
        return this.platformBased;
    }

    public setPlatformBased(platformBased: ExtendedTypeValue): void {
        this.platformBased = platformBased;
    }

    public getOrderBased(): ExtendedTypeValue {
        return this.orderBased;
    }

    public setOrderBased(orderBased: ExtendedTypeValue): void {
        this.orderBased = orderBased;
    }

    public getItemBased(): ItemFeedback[] {
        return this.itemBased;
    }

    public setItemBased(itemBased: ItemFeedback[]): void {
        this.itemBased = itemBased;
    }

    public getCustomerId(): string {
        return this.customerId;
    }

    public setCustomerId(customerId: string): void {
        this.customerId = customerId;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getComments(): string {
        return this.comments;
    }

    public setComments(comments: string): void {
        this.comments = comments;
    }
}
