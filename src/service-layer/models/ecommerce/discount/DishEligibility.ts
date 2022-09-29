import { ServiceObject } from "../../../../service-layer/models/ServiceObject";


export enum DishEligibilityType {
    order = "order",
    category = "category",
    item = "product"
}

export class DishEligibility extends ServiceObject {
    private eligilibityType: DishEligibilityType;
    private categoryIds: Array<string>;
    private productIds: Array<string>; 

    public getProductIds(): Array<string> {
        return this.productIds;
    }

    public setProductIds(productIds: Array<string>): void {
        this.productIds = productIds;
    }
   

    public getEligilibityType(): DishEligibilityType {
        return this.eligilibityType;
    }

    public setEligilibityType(eligilibityType: DishEligibilityType): void {
        this.eligilibityType = eligilibityType;
    }

    public getCategoryIds(): Array<string> {
        return this.categoryIds;
    }

    public setCategoryIds(categoryIds: Array<string>): void {
        this.categoryIds = categoryIds;
    }

     
}

