import { ServiceObject } from "../ServiceObject";
import { ItemVariant } from "./ItemVariant";
import { InventoryMeasurementUnitConverstions } from "./MeasurementUnitConverstions";
import { Stock } from "./Stock";

export enum PurchaseFrom {
    Domestic = 'domestic',
    International = 'international'
}

export class Item extends ServiceObject {
    private restaurantId: string;
    private name: string;
    private type: string;
    private storeName: string;
    private storeId: string;
    private category: string;
    private units: string;
    private minQty: number;
    private minQtyUnit: string;
    private maxQtyUnit: string;
    private maxQty: number;
    private minOrderPeriod: number;
    private itemCurrentStock: Stock;
    private stockableItem: boolean;
    private itemExpiry: boolean;
    private purchaseFrom: PurchaseFrom;
    private unitId: string;
    private yieldPercentage: number;
    private categoryId: string;
    private unitDetails: InventoryMeasurementUnitConverstions;
    private qtyUnitForPrice: string;
    private itemInitialStock: Stock;
    private itemTypeId: string;
    private itemVariants: Array<ItemVariant>;
    private kitchenId: string;

    public getKitchenId(): string {
        return this.kitchenId;
    }

    public setKitchenId(kitchenId: string): void {
        this.kitchenId = kitchenId;
    }
 // only used in costcenters

    public getItemVariants(): Array<ItemVariant> {
        return this.itemVariants;
    }

    public setItemVariants(itemVariants: Array<ItemVariant>): void {
        this.itemVariants = itemVariants;
    }



    public getItemTypeId(): string {
        return this.itemTypeId;
    }

    public setItemTypeId(itemTypeId: string): void {
        this.itemTypeId = itemTypeId;
    }

    public getItemInitialStock(): Stock {
        return this.itemInitialStock;
    }

    public setItemInitialStock(itemInitialStock: Stock): void {
        this.itemInitialStock = itemInitialStock;
    }

    public getQtyUnitForPrice(): string {
        return this.qtyUnitForPrice;
    }

    public setQtyUnitForPrice(qtyUnitForPrice: string): void {
        this.qtyUnitForPrice = qtyUnitForPrice;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getUnitDetails(): InventoryMeasurementUnitConverstions {
        return this.unitDetails;
    }

    public setUnitDetails(unitDetails: InventoryMeasurementUnitConverstions): void {
        this.unitDetails = unitDetails;
    }


    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }

    public getYieldPercentage(): number {
        return this.yieldPercentage;
    }

    public setYieldPercentage(yieldPercentage: number): void {
        this.yieldPercentage = yieldPercentage;
    }

    public isStockableItem(): boolean {
        return this.stockableItem;
    }

    public setStockableItem(stockableItem: boolean): void {
        this.stockableItem = stockableItem;
    }

    public isItemExpiry(): boolean {
        return this.itemExpiry;
    }

    public setItemExpiry(itemExpiry: boolean): void {
        this.itemExpiry = itemExpiry;
    }

    public getPurchaseFrom(): PurchaseFrom {
        return this.purchaseFrom;
    }

    public setPurchaseFrom(purchaseFrom: PurchaseFrom): void {
        this.purchaseFrom = purchaseFrom;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getStoreName(): string {
        return this.storeName;
    }

    public setStoreName(storeName: string): void {
        this.storeName = storeName;
    }

    public getStoreId(): string {
        return this.storeId;
    }

    public setStoreId(storeId: string): void {
        this.storeId = storeId;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getUnits(): string {
        return this.units;
    }

    public setUnits(units: string): void {
        this.units = units;
    }

    public getMinQty(): number {
        return this.minQty;
    }

    public setMinQty(minQty: number): void {
        this.minQty = minQty;
    }

    public getMinQtyUnit(): string {
        return this.minQtyUnit;
    }

    public setMinQtyUnit(minQtyUnit: string): void {
        this.minQtyUnit = minQtyUnit;
    }

    public getMaxQtyUnit(): string {
        return this.maxQtyUnit;
    }

    public setMaxQtyUnit(maxQtyUnit: string): void {
        this.maxQtyUnit = maxQtyUnit;
    }

    public getMaxQty(): number {
        return this.maxQty;
    }

    public setMaxQty(maxQty: number): void {
        this.maxQty = maxQty;
    }

    public getMinOrderPeriod(): number {
        return this.minOrderPeriod;
    }

    public setMinOrderPeriod(minOrderPeriod: number): void {
        this.minOrderPeriod = minOrderPeriod;
    }

    public getItemCurrentStock(): Stock {
        return this.itemCurrentStock;
    }

    public setItemCurrentStock(itemCurrentStock: Stock): void {
        this.itemCurrentStock = itemCurrentStock;
    }

}