import { ServiceObject } from "../../../../service-layer/models/ServiceObject";
import { BusinessListResponseModel } from "./BusinessListResponseModel";
import { ProductRatingModel } from "./ProductRatingModel";
import { ProductVariantModel } from "./ProductVariantModel";

export class ProductModel extends ServiceObject {


    private businessId: string;
    private categoryId: string;
    private subCategoryId: string;
    private productType: ProductType;
    private isVeg: boolean;
    private countryOfOrigin: string;
    private productBrand: string;
    private sku: string;
    private showInTopProduct: boolean;
    private showRecommend: boolean;
    private productName: string;
    private productCode: string;
    private productWeight: number;
    private description: string;
    private productFeatures: string;
    private howToUse: string;
    private msp: number;
    private mrp: number;
    private sellingPrice: number;
    private deliveryCharges: number;
    private quantityAvailable: number;
    private averageRating: number;
    private noOfReviews: number;
    private thumbnailImage: string;
    private defaultImage: string;
    private totalViews: number;
    private stockAlertAt: number;
    private createdBy: string;
    private updatedBy: string;
    private photos: Array<string>;
    private variants: Array<ProductVariantModel>;
    private gstRate: number;
    private enableInventory: boolean;
    private ratingPercentage: ProductRatingModel;
    private inWishList: boolean;
    private business: BusinessListResponseModel;
    private estimatedTime: number;
    private appointmentRequired: boolean;
    private categoryName: string;
    private subCategoryName: string;
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

    public getCategoryName(): string {
        return this.categoryName;
    }

    public setCategoryName(categoryName: string): void {
        this.categoryName = categoryName;
    }

    public getSubCategoryName(): string {
        return this.subCategoryName;
    }

    public setSubCategoryName(subCategoryName: string): void {
        this.subCategoryName = subCategoryName;
    }

    
    public isAppointmentRequired(): boolean {
        return this.appointmentRequired;
    }

    public setAppointmentRequired(appointmentRequired: boolean): void {
        this.appointmentRequired = appointmentRequired;
    }


   

    public getEstimatedTime(): number {
        return this.estimatedTime;
    }

    public setEstimatedTime(estimatedTime: number): void {
        this.estimatedTime = estimatedTime;
    }


    public getBusiness(): BusinessListResponseModel {
        return this.business;
    }

    public setBusiness(business: BusinessListResponseModel): void {
        this.business = business;
    }


    public isInWishList(): boolean {
        return this.inWishList;
    }

    public setInWishList(inWishList: boolean): void {
        this.inWishList = inWishList;
    }

    
    public getRatingPercentage(): ProductRatingModel {
        return this.ratingPercentage;
    }

    public setRatingPercentage(ratingPercentage: ProductRatingModel): void {
        this.ratingPercentage = ratingPercentage;
    }


    public getBusinessId(): string {
        return this.businessId;
    }

    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getSubCategoryId(): string {
        return this.subCategoryId;
    }

    public setSubCategoryId(subCategoryId: string): void {
        this.subCategoryId = subCategoryId;
    }

    public getProductType(): ProductType {
        return this.productType;
    }

    public setProductType(productType: ProductType): void {
        this.productType = productType;
    }

    public isIsVeg(): boolean {
        return this.isVeg;
    }

    public setIsVeg(isVeg: boolean): void {
        this.isVeg = isVeg;
    }

    public getCountryOfOrigin(): string {
        return this.countryOfOrigin;
    }

    public setCountryOfOrigin(countryOfOrigin: string): void {
        this.countryOfOrigin = countryOfOrigin;
    }

    public getProductBrand(): string {
        return this.productBrand;
    }

    public setProductBrand(productBrand: string): void {
        this.productBrand = productBrand;
    }

    public getSku(): string {
        return this.sku;
    }

    public setSku(sku: string): void {
        this.sku = sku;
    }

    public isShowInTopProduct(): boolean {
        return this.showInTopProduct;
    }

    public setShowInTopProduct(showInTopProduct: boolean): void {
        this.showInTopProduct = showInTopProduct;
    }

    public isShowRecommend(): boolean {
        return this.showRecommend;
    }

    public setShowRecommend(showRecommend: boolean): void {
        this.showRecommend = showRecommend;
    }

    public getProductName(): string {
        return this.productName;
    }

    public setProductName(productName: string): void {
        this.productName = productName;
    }

    public getProductCode(): string {
        return this.productCode;
    }

    public setProductCode(productCode: string): void {
        this.productCode = productCode;
    }

    public getProductWeight(): number {
        return this.productWeight;
    }

    public setProductWeight(productWeight: number): void {
        this.productWeight = productWeight;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getProductFeatures(): string {
        return this.productFeatures;
    }

    public setProductFeatures(productFeatures: string): void {
        this.productFeatures = productFeatures;
    }

    public getHowToUse(): string {
        return this.howToUse;
    }

    public setHowToUse(howToUse: string): void {
        this.howToUse = howToUse;
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

    public getAverageRating(): number {
        return this.averageRating;
    }

    public setAverageRating(averageRating: number): void {
        this.averageRating = averageRating;
    }

    public getNoOfReviews(): number {
        return this.noOfReviews;
    }

    public setNoOfReviews(noOfReviews: number): void {
        this.noOfReviews = noOfReviews;
    }

    public getThumbnailImage(): string {
        return this.thumbnailImage;
    }

    public setThumbnailImage(thumbnailImage: string): void {
        this.thumbnailImage = thumbnailImage;
    }

    public getDefaultImage(): string {
        return this.defaultImage;
    }

    public setDefaultImage(defaultImage: string): void {
        this.defaultImage = defaultImage;
    }

    public getTotalViews(): number {
        return this.totalViews;
    }

    public setTotalViews(totalViews: number): void {
        this.totalViews = totalViews;
    }

    public getStockAlertAt(): number {
        return this.stockAlertAt;
    }

    public setStockAlertAt(stockAlertAt: number): void {
        this.stockAlertAt = stockAlertAt;
    }

    public getCreatedBy(): string {
        return this.createdBy;
    }

    public setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy;
    }

    public getUpdatedBy(): string {
        return this.updatedBy;
    }

    public setUpdatedBy(updatedBy: string): void {
        this.updatedBy = updatedBy;
    }

    public getPhotos(): Array<string> {
        if(this.photos == undefined){
            this.photos = [];
        }
        return this.photos;
    }

    public setPhotos(photos: Array<string>): void {
        this.photos = photos;
    }

    public getVariants(): Array<ProductVariantModel> {
        return this.variants;
    }

    public setVariants(variants: Array<ProductVariantModel>): void {
        this.variants = variants;
    }

    public getGstRate(): number {
        return this.gstRate;
    }

    public setGstRate(gstRate: number): void {
        this.gstRate = gstRate;
    }

    public isEnableInventory(): boolean {
        return this.enableInventory;
    }

    public setEnableInventory(enableInventory: boolean): void {
        this.enableInventory = enableInventory;
    }


}
export enum ProductType {
    Regular = "regular",
    RegularPlusVariants = "regularPlusVariants",
    // RegularPlusAddOnGroups = "regularPlusAddOnGroups",
}
