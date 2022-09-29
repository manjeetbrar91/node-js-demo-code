import { MyError } from "../../../../common/MyError";
import { ProductModel } from "../response/ProductModel";
import { DiscountBase } from "./DiscountBase";

export class BuyXGetYDiscount extends DiscountBase {
    CheckEligibility(): boolean {
        throw new MyError("Method not implemented.");
    }
    private buyItems: ProductModel;
    private buyQuantity: number;
    private getItems: ProductModel;
    private getQuantity: number;
    private percentageDiscount: number;
    private isFree: boolean;
    private isMultipleUsageAllowed: boolean;
    private maximumAllowedUsage: number;

    public getBuyItems(): ProductModel {
        return this.buyItems;
    }

    public setBuyItems(buyItems: ProductModel): void {
        this.buyItems = buyItems;
    }

    public getBuyQuantity(): number {
        return this.buyQuantity;
    }

    public setBuyQuantity(buyQuantity: number): void {
        this.buyQuantity = buyQuantity;
    }

    public getGetItems(): ProductModel {
        return this.getItems;
    }

    public setGetItems(getItems: ProductModel): void {
        this.getItems = getItems;
    }

    public getGetQuantity(): number {
        return this.getQuantity;
    }

    public setGetQuantity(getQuantity: number): void {
        this.getQuantity = getQuantity;
    }

    public getPercentageDiscount(): number {
        return this.percentageDiscount;
    }

    public setPercentageDiscount(percentageDiscount: number): void {
        this.percentageDiscount = percentageDiscount;
    }

    public isIsFree(): boolean {
        return this.isFree;
    }

    public setIsFree(isFree: boolean): void {
        this.isFree = isFree;
    }

    public isIsMultipleUsageAllowed(): boolean {
        return this.isMultipleUsageAllowed;
    }

    public setIsMultipleUsageAllowed(isMultipleUsageAllowed: boolean): void {
        this.isMultipleUsageAllowed = isMultipleUsageAllowed;
    }

    public getMaximumAllowedUsage(): number {
        return this.maximumAllowedUsage;
    }

    public setMaximumAllowedUsage(maximumAllowedUsage: number): void {
        this.maximumAllowedUsage = maximumAllowedUsage;
    }

     
}