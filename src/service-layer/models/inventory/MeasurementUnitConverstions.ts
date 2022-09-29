import { ServiceObject } from "../ServiceObject";
import { InventoryMeasurementUnits } from "./MeasurementUnits";

export class InventoryMeasurementUnitConverstions extends ServiceObject {
    private restaurantId: string;
    private conversionName: string;
    private units: Array<InventoryMeasurementUnits>;

    public getUnits(): Array<InventoryMeasurementUnits> {
        return this.units;
    }

    public setUnits(units: Array<InventoryMeasurementUnits>): void {
        this.units = units;
    }

    public getConversionName(): string {
        return this.conversionName;
    }

    public setConversionName(conversionName: string): void {
        this.conversionName = conversionName;
    }


    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }






}