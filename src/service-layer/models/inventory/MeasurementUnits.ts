import { ServiceObject } from "../ServiceObject";

export class InventoryMeasurementUnits extends ServiceObject {
    private restaurantId: string;
    private unitName: string;
    private unitShortName: string;
    private factor: number

    public getFactor(): number {
        return this.factor;
    }

    public setFactor(factor: number): void {
        this.factor = factor;
    }

 
    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getUnitName(): string {
        return this.unitName;
    }

    public setUnitName(unitName: string): void {
        this.unitName = unitName;
    }

    public getUnitShortName(): string {
        return this.unitShortName;
    }

    public setUnitShortName(unitShortName: string): void {
        this.unitShortName = unitShortName;
    }




}