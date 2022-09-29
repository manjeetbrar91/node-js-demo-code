
import { FuelDiscountBase } from "./FuelDiscountBase";


export enum FuelMinMaxRequirementType {
    none = 'none',
    purchaseamount = 'purchaseAmount',
    quantity = 'quantity'
}


export enum FuelEligibilityType {
    order = "order",
    quantity = "quantity"
}
export class FuelFixedAmountDiscount extends FuelDiscountBase {
    private value: number;
    private eligibilityType: FuelEligibilityType;
    private minRequirement: number;
    private maxRequirement: number;
    private minimumRequirementType: FuelMinMaxRequirementType;
    private maxRequirementType: FuelMinMaxRequirementType;

 

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getEligibilityType(): FuelEligibilityType {
        return this.eligibilityType;
    }

    public setEligibilityType(eligibilityType: FuelEligibilityType): void {
        this.eligibilityType = eligibilityType;
    }

    public getMinRequirement(): number {
        return this.minRequirement;
    }

    public setMinRequirement(minRequirement: number): void {
        this.minRequirement = minRequirement;
    }

    public getMaxRequirement(): number {
        return this.maxRequirement;
    }

    public setMaxRequirement(maxRequirement: number): void {
        this.maxRequirement = maxRequirement;
    }

    public getMinimumRequirementType(): FuelMinMaxRequirementType {
        return this.minimumRequirementType;
    }

    public setMinimumRequirementType(minimumRequirementType: FuelMinMaxRequirementType): void {
        this.minimumRequirementType = minimumRequirementType;
    }

    public getMaxRequirementType(): FuelMinMaxRequirementType {
        return this.maxRequirementType;
    }

    public setMaxRequirementType(maxRequirementType: FuelMinMaxRequirementType): void {
        this.maxRequirementType = maxRequirementType;
    }



    CheckEligibility() {

    }
    constructor() {
        super();
    }
}

