import { ServiceObject } from "../ServiceObject";


export class InventoryCostCenterItemStockReportModel extends ServiceObject {

    private itemId: string;
    private variantId: string;
    private variantName: string;
    private variantQty: number;
    private variantUnit: string;
    private restaurantId: string;
    private kitchenId: string;

    private quantity: number;
    private price: number;
    
    private unitId: string;
    private itemName: string;
    private categoryName: string;
    private categoryId: string;
    
    private kitchenName: string;
    
    private qtyUnit: string;
    private subTotal: number;
    private totalAmount: number;
    private gstAmount: number;

    public getSubTotal(): number {
        return this.subTotal;
    }

    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }

    public getGstAmount(): number {
        return this.gstAmount;
    }

    public setGstAmount(gstAmount: number): void {
        this.gstAmount = gstAmount;
    }

    
    public getQtyUnit(): string {
        return this.qtyUnit;
    }

    public setQtyUnit(qtyUnit: string): void {
        this.qtyUnit = qtyUnit;
    }

    
    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }

    public getVariantName(): string {
        return this.variantName;
    }

    public setVariantName(variantName: string): void {
        this.variantName = variantName;
    }

    public getVariantQty(): number {
        return this.variantQty;
    }

    public setVariantQty(variantQty: number): void {
        this.variantQty = variantQty;
    }

    public getVariantUnit(): string {
        return this.variantUnit;
    }

    public setVariantUnit(variantUnit: string): void {
        this.variantUnit = variantUnit;
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

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
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

    public getKitchenName(): string {
        return this.kitchenName;
    }

    public setKitchenName(kitchenName: string): void {
        this.kitchenName = kitchenName;
    }


}