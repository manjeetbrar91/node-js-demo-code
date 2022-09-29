import { ServiceObject } from "../../../../service-layer/models/ServiceObject";

export class ProductVariantModel extends ServiceObject {
    private msp: number;
    private mrp: number;

    private sellingPrice: number;
    private variantName: string;
    private productId: string;
    private variantType: string;
    private sku: string;

    private productWeight: number;
    private deliveryCharges: number;
    private quantityAvailable: number;
    private stockAlertAt: number;
    private enableInventory: boolean;
    private qty: number;
    private qtyUnit: string;

    public getQty(): number {
        return this.qty;
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


    public getMsp(): number {
        return this.msp;
    }

    public setMsp(msp: number): void {
        this.msp = msp;
    }

    public getMrp(): number {
        return this.mrp;
    }

    public setMrp(mrp: number): void {
        this.mrp = mrp;
    }

    public getSellingPrice(): number {
        return this.sellingPrice;
    }

    public setSellingPrice(sellingPrice: number): void {
        this.sellingPrice = sellingPrice;
    }

    public getVariantName(): string {
        return this.variantName;
    }

    public setVariantName(variantName: string): void {
        this.variantName = variantName;
    }

    public getProductId(): string {
        return this.productId;
    }

    public setProductId(productId: string): void {
        this.productId = productId;
    }

    public getVariantType(): string {
        return this.variantType;
    }

    public setVariantType(variantType: string): void {
        this.variantType = variantType;
    }

    public getSku(): string {
        return this.sku;
    }

    public setSku(sku: string): void {
        this.sku = sku;
    }

    public getProductWeight(): number {
        return this.productWeight;
    }

    public setProductWeight(productWeight: number): void {
        this.productWeight = productWeight;
    }

    public getDeliveryCharges(): number {
        return this.deliveryCharges;
    }

    public setDeliveryCharges(deliveryCharges: number): void {
        this.deliveryCharges = deliveryCharges;
    }

    public getQuantityAvailable(): number {
        return this.quantityAvailable;
    }

    public setQuantityAvailable(quantityAvailable: number): void {
        this.quantityAvailable = quantityAvailable;
    }

    public getStockAlertAt(): number {
        return this.stockAlertAt;
    }

    public setStockAlertAt(stockAlertAt: number): void {
        this.stockAlertAt = stockAlertAt;
    }

    public isEnableInventory(): boolean {
        return this.enableInventory;
    }

    public setEnableInventory(enableInventory: boolean): void {
        this.enableInventory = enableInventory;
    }

}