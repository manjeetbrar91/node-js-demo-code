import { Stock } from "./Stock";

export enum StockType {
    Purchase = 'purchase',
    Transfer = 'Transfer',
    Consumption = 'consumption',
    Adjustment = 'adjustment',
    Missing = 'missing',
    Wastage = 'wastage'
}

export class ItemStock extends Stock {
    private itemId: string;
    private restaurantId: string;
    private type: StockType;
    private vendorId: string;
    private chefId: string;
    private managerId: string;
    private stockRequestDate: Date;
    private stockApprovedBy: string;
    private stockRequestedBy: string;
    private stockApprovalDate: Date;
    private purchaseOrderId: string;
    private variantId: string;
    private variantQty: number;
    private variantQtyUnit: string;
    private variant: string;

    public getVariant(): string {
        return this.variant;
    }

    public setVariant(variant: string): void {
        this.variant = variant;
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


    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }


    public getPurchaseOrderId(): string {
        return this.purchaseOrderId;
    }

    public setPurchaseOrderId(purchaseOrderId: string): void {
        this.purchaseOrderId = purchaseOrderId;
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

    public getType(): StockType {
        return this.type;
    }

    public setType(type: StockType): void {
        this.type = type;
    }

    public getVendorId(): string {
        return this.vendorId;
    }

    public setVendorId(vendorId: string): void {
        this.vendorId = vendorId;
    }

    public getChefId(): string {
        return this.chefId;
    }

    public setChefId(chefId: string): void {
        this.chefId = chefId;
    }

    public getManagerId(): string {
        return this.managerId;
    }

    public setManagerId(managerId: string): void {
        this.managerId = managerId;
    }

    public getStockRequestDate(): Date {
        return this.stockRequestDate;
    }

    public setStockRequestDate(stockRequestDate: Date): void {
        this.stockRequestDate = stockRequestDate;
    }

    public getStockApprovedBy(): string {
        return this.stockApprovedBy;
    }

    public setStockApprovedBy(stockApprovedBy: string): void {
        this.stockApprovedBy = stockApprovedBy;
    }

    public getStockRequestedBy(): string {
        return this.stockRequestedBy;
    }

    public setStockRequestedBy(stockRequestedBy: string): void {
        this.stockRequestedBy = stockRequestedBy;
    }

    public getStockApprovalDate(): Date {
        return this.stockApprovalDate;
    }

    public setStockApprovalDate(stockApprovalDate: Date): void {
        this.stockApprovalDate = stockApprovalDate;
    }
}