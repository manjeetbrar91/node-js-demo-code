import { ServiceObject } from "../ServiceObject";
import { Stock } from "./Stock";
export enum ItemVariantType {
    Custom = "Custom"
}
export class ItemVariant extends ServiceObject {
    private itemId: string;
    private restaurantId: string;
    private variantName: string;
    private variantQTY: number;
    private variantQTYUnit: string;
    private minStockQTY: number;
    private maxStockQTY: number;
    private currentStockQTY: number;
    private latestPricePerQty: number;
    private averagePricePerQty: number;
    private lastPurchaseDate: Date;
    private currentStock: Stock;
    private unitId: string;
    private initialStock: Stock;
    private itemName: Stock;
    private categoryId: Stock;
    private storeId: Stock;
    private categoryName: Stock;

    public getItemName(): Stock {
        return this.itemName;
    }

    public setItemName(itemName: Stock): void {
        this.itemName = itemName;
    }

    public getCategoryId(): Stock {
        return this.categoryId;
    }

    public setCategoryId(categoryId: Stock): void {
        this.categoryId = categoryId;
    }

    public getStoreId(): Stock {
        return this.storeId;
    }

    public setStoreId(storeId: Stock): void {
        this.storeId = storeId;
    }

    public getCategoryName(): Stock {
        return this.categoryName;
    }

    public setCategoryName(categoryName: Stock): void {
        this.categoryName = categoryName;
    }


    public getInitialStock(): Stock {
        return this.initialStock;
    }

    public setInitialStock(initialStock: Stock): void {
        this.initialStock = initialStock;
    }


    public getCurrentStockQTY(): number {
        return this.currentStockQTY;
    }

    public setCurrentStockQTY(currentStockQTY: number): void {
        this.currentStockQTY = currentStockQTY;
    }


    public getAveragePricePerQty(): number {
        return this.averagePricePerQty;
    }

    public setAveragePricePerQty(averagePricePerQty: number): void {
        this.averagePricePerQty = averagePricePerQty;
    }



    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }


    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }


    public getVariantName(): string {
        return this.variantName;
    }

    public setVariantName(variantName: string): void {
        this.variantName = variantName;
    }

    public getVariantQTY(): number {
        return this.variantQTY;
    }

    public setVariantQTY(variantQTY: number): void {
        this.variantQTY = variantQTY;
    }

    public getVariantQTYUnit(): string {
        return this.variantQTYUnit;
    }

    public setVariantQTYUnit(variantQTYUnit: string): void {
        this.variantQTYUnit = variantQTYUnit;
    }

    public getMinStockQTY(): number {
        return this.minStockQTY;
    }

    public setMinStockQTY(minStockQTY: number): void {
        this.minStockQTY = minStockQTY;
    }

    public getMaxStockQTY(): number {
        return this.maxStockQTY;
    }

    public setMaxStockQTY(maxStockQTY: number): void {
        this.maxStockQTY = maxStockQTY;
    }


    public getLatestPricePerQty(): number {
        return this.latestPricePerQty ? this.latestPricePerQty : 0
    }

    public setLatestPricePerQty(latestPricePerQty: number): void {
        this.latestPricePerQty = latestPricePerQty;
    }


    public getLastPurchaseDate(): Date {
        return this.lastPurchaseDate;
    }

    public setLastPurchaseDate(lastPurchaseDate: Date): void {
        this.lastPurchaseDate = lastPurchaseDate;
    }

    public getCurrentStock(): Stock {
        return this.currentStock;
    }

    public setCurrentStock(currentStock: Stock): void {
        this.currentStock = currentStock;
    }
    // private uomQTY:string;

}
