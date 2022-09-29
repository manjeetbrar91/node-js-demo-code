export class CartResponseModel {

    private deliveryCharges: number;
    private productId: string;
    private productName: string;
    private variantName: string;
    private mrp: number;
    private sellingPrice: number;
    private variantId: string;
    private gstRate: number;
    private defaultImage: string;
    private businessId: string;
    private quantityAvailable: number;
    private enableInventory: boolean;
    private productWeight: number;
    private categoryId: string;
    private appointmentRequired: boolean;

    public isAppointmentRequired(): boolean {
        if (this.appointmentRequired == undefined) {
            this.appointmentRequired = false
        }
        return this.appointmentRequired;
    }

    public setAppointmentRequired(appointmentRequired: boolean): void {
        this.appointmentRequired = appointmentRequired;
    }


    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }


    public getProductWeight(): number {
        return this.productWeight;
    }

    public setProductWeight(productWeight: number): void {
        this.productWeight = productWeight;
    }


    public getQuantityAvailable(): number {
        return this.quantityAvailable;
    }

    public setQuantityAvailable(quantityAvailable: number): void {
        this.quantityAvailable = quantityAvailable;
    }

    public isEnableInventory(): boolean {
        if(this.enableInventory == undefined){
            this.enableInventory = false;
        }
        return this.enableInventory;
    }

    public setEnableInventory(enableInventory: boolean): void {
        this.enableInventory = enableInventory;
    }


    public getBusinessId(): string {
        return this.businessId;
    }

    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
    }


    public getDefaultImage(): string {
        return this.defaultImage;
    }

    public setDefaultImage(defaultImage: string): void {
        this.defaultImage = defaultImage;
    }


    public getGstRate(): number {
        return this.gstRate;
    }

    public setGstRate(gstRate: number): void {
        this.gstRate = gstRate;
    }


    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }


    public getDeliveryCharges(): number {
        return this.deliveryCharges;
    }

    public setDeliveryCharges(deliveryCharges: number): void {
        this.deliveryCharges = deliveryCharges;
    }

    public getProductId(): string {
        return this.productId;
    }

    public setProductId(productId: string): void {
        this.productId = productId;
    }

    public getProductName(): string {
        return this.productName;
    }

    public setProductName(productName: string): void {
        this.productName = productName;
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


}