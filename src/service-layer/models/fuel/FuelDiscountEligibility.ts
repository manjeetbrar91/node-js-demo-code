import { ServiceObject } from "../ServiceObject";

 

export enum FuelDishEligibilityType {
    order = "order",
    quantity = "quantity"
}

export class FuelDiscountEligibility extends ServiceObject {
    private eligibilityType: FuelDishEligibilityType;
    private categoryIds: Array<string>;
    private productIds: Array<string>; 

     
     
}

