import { ServiceObject } from "../ServiceObject";

export class Stock extends ServiceObject {
    private qty: number;
    private qtyUnit: string;
    private price: number;
    private purchaseDate: Date;
    private unitId: string;
    private subTotal: number;
    private gst: number;
    private totalPrice: number;
    private balance: number;
    private description: string;
    private balanceUnit: string;
    private averagePrice: number;
    private priceQtyUnit: number;
    private averagePriceQTYUnit: number;

    public getAveragePriceQTYUnit(): number {
        return this.averagePriceQTYUnit;
    }

    public setAveragePriceQTYUnit(averagePriceQTYUnit: number): void {
        this.averagePriceQTYUnit = averagePriceQTYUnit;
    }


    public getPriceQtyUnit(): number {
        return this.priceQtyUnit ? this.priceQtyUnit : 0;
    }

    public setPriceQtyUnit(priceQtyUnit: number): void {
        this.priceQtyUnit = priceQtyUnit;
    }




    public getAveragePrice(): number {
        return this.averagePrice;
    }

    public setAveragePrice(averagePrice: number): void {
        this.averagePrice = averagePrice;
    }

    public getBalanceUnit(): string {
        return this.balanceUnit;
    }

    public setBalanceUnit(balanceUnit: string): void {
        this.balanceUnit = balanceUnit;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getBalance(): number {
        return this.balance ? this.balance : 0;
    }

    public setBalance(balance: number): void {
        this.balance = balance;
    }

    public getSubTotal(): number {
        return this.subTotal ? this.subTotal : 0;
    }

    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }

    public getGst(): number {
        return this.gst ? this.gst : 0;
    }

    public setGst(gst: number): void {
        this.gst = gst;
    }

    public getTotalPrice(): number {
        return this.totalPrice ? this.totalPrice : 0;
    }

    public setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }


    public getPurchaseDate(): Date {
        return this.purchaseDate;
    }

    public setPurchaseDate(purchaseDate: Date): void {
        this.purchaseDate = purchaseDate;
    }

    public getQty(): number {
        return this.qty ? this.qty : 0;
    }

    public setQty(qty: number): void {
        this.qty = qty;
    }

    public getQtyUnit(): string {
        return this.qtyUnit;
    }

    public setQtyUnit(qtyUnit: string): void {
        this.qtyUnit = qtyUnit;
    }

    public getPrice(): number {
        return this.price ? this.price : 0;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

}