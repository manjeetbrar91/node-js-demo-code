import { ServiceObject } from './ServiceObject';
import { MeasureType, MeasurementObserved } from './Measurements';

export class IngredientObserved {
    private ingredientId: string;
    private measurement: MeasurementObserved;

    public getIngredientId(): string {
        return this.ingredientId;
    }

    public setIngredientId(ingredientId: string): void {
        this.ingredientId = ingredientId;
    }

    public getMeasurement(): MeasurementObserved {
        return this.measurement;
    }

    public setMeasurement(measurement: MeasurementObserved): void {
        this.measurement = measurement;
    }

}

export class InventoryIngredient extends ServiceObject {
    private name: string;
    private measureType: MeasureType;
    private description: string;
    private remaining: MeasurementObserved;
    private notify: MeasurementObserved;
    private alert: boolean;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getMeasureType(): MeasureType {
        return this.measureType;
    }

    public setMeasureType(measureType: MeasureType): void {
        this.measureType = measureType;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getRemaining(): MeasurementObserved {
        return this.remaining;
    }

    public setRemaining(remaining: MeasurementObserved): void {
        this.remaining = remaining;
    }

    public getNotify(): MeasurementObserved {
        return this.notify;
    }

    public setNotify(notify: MeasurementObserved): void {
        this.notify = notify;
    }

    public isAlert(): boolean {
        return this.alert;
    }

    public setAlert(alert: boolean): void {
        this.alert = alert;
    }
}