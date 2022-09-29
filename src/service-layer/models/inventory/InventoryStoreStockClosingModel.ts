
import { ServiceObject } from '../ServiceObject';

export class InventoryStoreStockClosingModel extends ServiceObject {

    private variantId: string;
    private restaurantId: string;
    private itemId: string;
    private qty: number;
    private averagePrice: number;
    private priceQtyUnit: number;
    private qtyUnit: string;
    private closingDate: string;
    private unitId: string;
    private variantName: string;
    private itemName: string;
    private categoryName: string;
    private categoryId: string;
    private variantQTY: number;
    private variantAveragePrice: number;
    private variantLatestPrice: number;
    private variantQTYUnit: string;    
    private variantCurrentStockQTY: number;

    public getVariantQTYUnit(): string {
        return this.variantQTYUnit;
    }

    public setVariantQTYUnit(variantQTYUnit: string): void {
        this.variantQTYUnit = variantQTYUnit;
    }

    public getVariantCurrentStockQTY(): number {
        return this.variantCurrentStockQTY;
    }

    public setVariantCurrentStockQTY(variantCurrentStockQTY: number): void {
        this.variantCurrentStockQTY = variantCurrentStockQTY;
    }


    public getVariantQTY(): number {
        return this.variantQTY;
    }

    public setVariantQTY(variantQTY: number): void {
        this.variantQTY = variantQTY;
    }

     

    public getVariantAveragePrice(): number {
        return this.variantAveragePrice;
    }

    public setVariantAveragePrice(variantAveragePrice: number): void {
        this.variantAveragePrice = variantAveragePrice;
    }

    public getVariantLatestPrice(): number {
        return this.variantLatestPrice;
    }

    public setVariantLatestPrice(variantLatestPrice: number): void {
        this.variantLatestPrice = variantLatestPrice;
    }
 





    public getVariantName(): string {
        return this.variantName;
    }

    public setVariantName(variantName: string): void {
        this.variantName = variantName;
    }

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public getCategoryName(): string {
        return this.categoryName;
    }

    public setCategoryName(categoryName: string): void {
        this.categoryName = categoryName;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }




    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getQty(): number {
        return this.qty;
    }

    public setQty(qty: number): void {
        this.qty = qty;
    }

    public getAveragePrice(): number {
        return this.averagePrice;
    }

    public setAveragePrice(averagePrice: number): void {
        this.averagePrice = averagePrice;
    }

    public getPriceQtyUnit(): number {
        return this.priceQtyUnit;
    }

    public setPriceQtyUnit(priceQtyUnit: number): void {
        this.priceQtyUnit = priceQtyUnit;
    }

    public getQtyUnit(): string {
        return this.qtyUnit;
    }

    public setQtyUnit(qtyUnit: string): void {
        this.qtyUnit = qtyUnit;
    }

    public getClosingDate(): string {
        return this.closingDate;
    }

    public setClosingDate(closingDate: string): void {
        this.closingDate = closingDate;
    }

    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }









}