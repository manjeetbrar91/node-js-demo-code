import { ServiceObject } from "../ServiceObject";
import { RecipeType } from "./InventoryRecipe";

export class BaseRecipeItem extends ServiceObject{
    private type: RecipeType;
    private quantity: number;
    private rate: number;
    private totalValue: number;
    private units: string;

    constructor(type: RecipeType) {
        super();
        this.type = type;
    }

    public getType(): RecipeType {
        return this.type;
    }

    public setType(type: RecipeType): void {
        this.type = type;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getRate(): number {
        return this.rate;
    }

    public setRate(rate: number): void {
        this.rate = rate;
    }

    public getTotalValue(): number {
        return this.totalValue;
    }

    public setTotalValue(totalValue: number): void {
        this.totalValue = totalValue;
    }

    public getUnits(): string {
        return this.units;
    }

    public setUnits(units: string): void {
        this.units = units;
    }

}