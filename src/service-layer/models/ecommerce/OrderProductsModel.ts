export class OrderProductsModel {
    private productId: string;
    private variantId: string;
    private variantName: string;
    
    private mrp: number;
    private sellingPrice: number;
    private quantity: number;
    private subTotal: number;
    private taxAmount: number
    private tax: number;
    private totalAmount: number;
    private deliveryCharges: number;
    private packingCharges: number;
    private productName: string;
    private businessId: string;
    private currency:string;
    private currencySymbol:string;
    private currencyConversion:number;
    private defaultImage:string;
    private updateInventory:boolean;
    private productWeight: number;
    private categoryId: string;

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }


    public getProductWeight(): number {
        if(this.productWeight == undefined || isNaN(this.productWeight)){
            this.productWeight = 0
        }
        return this.productWeight;
    }

    public setProductWeight(productWeight: number): void {
        this.productWeight = productWeight;
    }

    
    public isUpdateInventory(): boolean {
        return this.updateInventory;
    }

    public setUpdateInventory(updateInventory: boolean): void {
        this.updateInventory = updateInventory;
    }


    public getDefaultImage(): string {
        return this.defaultImage;
    }

    public setDefaultImage(defaultImage: string): void {
        this.defaultImage = defaultImage;
    }


    public getCurrencyConversion(): number {
        return this.currencyConversion;
    }

    public setCurrencyConversion(currencyConversion: number): void {
        this.currencyConversion = currencyConversion;
    }


    public getCurrencySymbol(): string {
        return this.currencySymbol;
    }

    public setCurrencySymbol(currencySymbol: string): void {
        this.currencySymbol = currencySymbol;
    }


    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    
    public getBusinessId(): string {
        return this.businessId;
    }
    
    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
    }
    
    
    public getProductName(): string {
        return this.productName;
    }

    public setProductName(productName: string): void {
        this.productName = productName;
    }


    public getProductId(): string {
        return this.productId;
    }

    public setProductId(productId: string): void {
        this.productId = productId;
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

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getSubTotal(): number {
        return this.subTotal;
    }

    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }

    public getTaxAmount(): number {
        return this.taxAmount;
    }

    public setTaxAmount(taxAmount: number): void {
        this.taxAmount = taxAmount;
    }

    public getTax(): number {
        if (this.tax == undefined) {
            this.tax = 0
        }
        return this.tax;
    }

    public setTax(tax: number): void {
        this.tax = tax;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }

    public getDeliveryCharges(): number {
        return this.deliveryCharges;
    }

    public setDeliveryCharges(deliveryCharges: number): void {
        this.deliveryCharges = deliveryCharges;
    }

    public getPackingCharges(): number {
        return this.packingCharges;
    }

    public setPackingCharges(packingCharges: number): void {
        this.packingCharges = packingCharges;
    }

}