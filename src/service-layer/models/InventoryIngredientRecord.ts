import { MeasurementObserved } from './Measurements';
import { ServiceObject } from './ServiceObject';

export enum IngredientInventoryRecordType {
    Purchase = "purchase",
    Correction = "correction",
}

export class IngredientInventoryRecord extends ServiceObject{
    private ingredientId: string;
    private date: Date;
    private amount: number;
    private quantity: MeasurementObserved;
    private recordType: IngredientInventoryRecordType;
    private remarks: string;

    public getRemarks(): string {
        return this.remarks;
    }

    public setRemarks(remarks: string): void {
        this.remarks = remarks;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

    public getQuantity(): MeasurementObserved {
        return this.quantity;
    }

    public setQuantity(quantity: MeasurementObserved): void {
        this.quantity = quantity;
    }

    public getRecordType(): IngredientInventoryRecordType {
        return this.recordType;
    }

    public setRecordType(recordType: IngredientInventoryRecordType): void {
        this.recordType = recordType;
    }

    public getIngredientId(): string {
        return this.ingredientId;
    }

    public setIngredientId(ingredientId: string): void {
        this.ingredientId = ingredientId;
    }
}