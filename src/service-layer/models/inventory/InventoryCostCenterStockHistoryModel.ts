import { InventoryMeasurementUnitConverstions } from "./MeasurementUnitConverstions";
import { Stock } from "./Stock";

export enum CostCenterItemStockType {
    Transfer = 'transfer',
    Consumption = 'consumption',
    Adjustment = 'adjustment',
    Missing = 'missing',
    Wastage = 'wastage',
    Return = 'return'

}

export class InventoryCostCenterStockHistoryModel extends Stock {
    private itemId: string;
    private restaurantId: string;
    private kitchenId: string;
    private type: CostCenterItemStockType;
    private transferRequestId: string;    
    private variantId: string;
    private variantQty: number;
    private variantQtyUnit: string;
    private orderId: string;
    private orderItemId: string;
    private orderMainItemId: string;
    private menuItemVariantName: string;
    private itemName: string;
    private categoryName: string;
    private categoryId: string;
    private storeId: string;
    private kitchenName: string;
    private unitDetails: InventoryMeasurementUnitConverstions;
    private itemCurrentStock: Stock;

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

    public getKitchenName(): string {
        return this.kitchenName;
    }

    public setKitchenName(kitchenName: string): void {
        this.kitchenName = kitchenName;
    }

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

    public getMenuItemVariantName(): string {
        return this.menuItemVariantName;
    }

    public setMenuItemVariantName(menuItemVariantName: string): void {
        this.menuItemVariantName = menuItemVariantName;
    }




    public getOrderMainItemId(): string {
        return this.orderMainItemId;
    }

    public setOrderMainItemId(orderMainItemId: string): void {
        this.orderMainItemId = orderMainItemId;
    }


    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getOrderItemId(): string {
        return this.orderItemId;
    }

    public setOrderItemId(orderItemId: string): void {
        this.orderItemId = orderItemId;
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

    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }

    public getType(): CostCenterItemStockType {
        return this.type;
    }

    public setType(type: CostCenterItemStockType): void {
        this.type = type;
    }

    public getTransferRequestId(): string {
        return this.transferRequestId;
    }

    public setTransferRequestId(transferRequestId: string): void {
        this.transferRequestId = transferRequestId;
    }

    public getVariantQty(): number {
        return this.variantQty;
    }

    public setVariantQty(variantQty: number): void {
        this.variantQty = variantQty;
    }

    public getVariantQtyUnit(): string {
        return this.variantQtyUnit;
    }

    public setVariantQtyUnit(variantQtyUnit: string): void {
        this.variantQtyUnit = variantQtyUnit;
    }


     
}