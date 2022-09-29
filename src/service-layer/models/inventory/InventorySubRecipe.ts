import { BaseRecipe } from "./BaseRecipe";
import { RecipeType } from "./InventoryRecipe";
import { RecipeItem } from "./RecipeItem";

export class InventorySubRecipe extends BaseRecipe {
    private rate: number;
    private totalValue: number;
    private units: string;
    private items: Array<RecipeItem>;
    private unitId: string;
    private qtyUnit: string;
    private qty: number; 

    constructor() {
        super(RecipeType.SubRecipe);
    }

    public getQty(): number {
        return this.qty;
    }

    public setQty(qty: number): void {
        this.qty = qty;
    }

    public getUnitId(): string {
        return this.unitId;
    }

    public setUnitId(unitId: string): void {
        this.unitId = unitId;
    }

    public getQtyUnit(): string {
        return this.qtyUnit;
    }

    public setQtyUnit(qtyUnit: string): void {
        this.qtyUnit = qtyUnit;
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

    public getItems(): Array<RecipeItem> {
        return this.items;
    }

    public setItems(items: Array<RecipeItem>): void {
        this.items = items;
    }
}