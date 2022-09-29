import { ServiceObject } from "../ServiceObject";
import { InventoryMeasurementUnitConverstions } from "./MeasurementUnitConverstions";
import { Stock } from "./Stock";


export class InventoryCostCenterItemStockModel extends ServiceObject {
    private itemId: string;
    private restaurantId: string;
    private kitchenId: string;
    
    private pricePerQty: number;
    private averagePricePerQTY: number;
    private stockQty: number;
    private stockQtyUnit: string;
    private description: string;
    private unitId: string;
    private itemName: string;
    private categoryName: string;
    private categoryId: string;
    private storeId: string;
    private kitchenName: string;
    private unitDetails: InventoryMeasurementUnitConverstions;
    private itemCurrentStock: Stock;

    public getUnitDetails(): InventoryMeasurementUnitConverstions {
        return this.unitDetails;
    }

    public setUnitDetails(unitDetails: InventoryMeasurementUnitConverstions): void {
        this.unitDetails = unitDetails;
    }

    public getItemCurrentStock(): Stock {
        return this.itemCurrentStock;
    }

    public setItemCurrentStock(itemCurrentStock: Stock): void {
        this.itemCurrentStock = itemCurrentStock;
    }


    public getKitchenName(): string {
        return this.kitchenName;
    }

    public setKitchenName(kitchenName: string): void {
        this.kitchenName = kitchenName;
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

    public getStoreId(): string {
        return this.storeId;
    }

    public setStoreId(storeId: string): void {
        this.storeId = storeId;
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

    public getKitchenId(): string {
        return this.kitchenId;
    }

    public setKitchenId(kitchenId: string): void {
        this.kitchenId = kitchenId;
    }

    public getPricePerQty(): number {
        return this.pricePerQty;
    }

    public setPricePerQty(pricePerQty: number): void {
        this.pricePerQty = pricePerQty;
    }

    public getAveragePricePerQTY(): number {
        return this.averagePricePerQTY;
    }

    public setAveragePricePerQTY(averagePricePerQTY: number): void {
        this.averagePricePerQTY = averagePricePerQTY;
    }

    public getStockQty(): number {
        return this.stockQty;
    }

    public setStockQty(stockQty: number): void {
        this.stockQty = stockQty;
    }

    public getStockQtyUnit(): string {
        return this.stockQtyUnit;
    }

    public setStockQtyUnit(stockQtyUnit: string): void {
        this.stockQtyUnit = stockQtyUnit;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }

}