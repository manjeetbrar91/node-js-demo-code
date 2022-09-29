export class InventoryPurchaseOrderItem {
    private itemId: string;
    private itemName: string;
    private qtyRequested: number;
    private variantRequested: number;
    private qty: number;
    private qtySubUnit: string;
    private qtyUnit: string;
    private price: number;
    private priceQtyUnit: number;
    private gstAmount: number;
    private subTotal: number;
    private totalAmount: number;
    private priceInclusiveTax: boolean;
    private gst: number;
    private unitId: string;
    private isDeleted: boolean;
    private variantId: string;

    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }


    public getPriceQtyUnit(): number {
        return this.priceQtyUnit;
    }

    public setPriceQtyUnit(priceQtyUnit: number): void {
        this.priceQtyUnit = priceQtyUnit;
    }


    public isIsDeleted(): boolean {
        return this.isDeleted;
    }

    public setIsDeleted(isDeleted: boolean): void {
        this.isDeleted = isDeleted;
    }




    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }

    public getQty(): number {
        return this.qty;
    }

    public setQty(qty: number): void {
        this.qty = qty;
    }
    public getGst(): number {
        return this.gst;
    }

    public setGst(gst: number): void {
        this.gst = gst;
    }


    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public getQtyRequested(): number {
        return this.qtyRequested;
    }

    public setQtyRequested(qtyRequested: number): void {
        this.qtyRequested = qtyRequested;
    }

    public getVariantRequested(): number {
        return this.variantRequested;
    }

    public setVariantRequested(variantRequested: number): void {
        this.variantRequested = variantRequested;
    }

    public getQtySubUnit(): string {
        return this.qtySubUnit;
    }

    public setQtySubUnit(qtySubUnit: string): void {
        this.qtySubUnit = qtySubUnit;
    }

    public getQtyUnit(): string {
        return this.qtyUnit;
    }

    public setQtyUnit(qtyUnit: string): void {
        this.qtyUnit = qtyUnit;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getGstAmount(): number {
        return this.gstAmount;
    }

    public setGstAmount(gstAmount: number): void {
        this.gstAmount = gstAmount;
    }

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

    public isPriceInclusiveTax(): boolean {
        return this.priceInclusiveTax;
    }

    public setPriceInclusiveTax(priceInclusiveTax: boolean): void {
        this.priceInclusiveTax = priceInclusiveTax;
    }

}