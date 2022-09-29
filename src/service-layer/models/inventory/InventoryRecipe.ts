import { BaseRecipe } from "./BaseRecipe";
import { RecipeItem } from "./RecipeItem";

export enum RecipeType {
    Main = 'main',
    SubRecipe = 'subrecipe'
}

export class InventoryRecipe extends BaseRecipe{
    private description: string;
    private processingTime: number;
    private sellingPrice: number;
    private costValue: number;
    private kitchen: string;
    private costPercentage: number;
    private items: Array<RecipeItem>;

    constructor(){
        super(RecipeType.Main);
    }
    
    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getProcessingTime(): number {
        return this.processingTime;
    }

    public setProcessingTime(processingTime: number): void {
        this.processingTime = processingTime;
    }

    public getSellingPrice(): number {
        return this.sellingPrice;
    }

    public setSellingPrice(sellingPrice: number): void {
        this.sellingPrice = sellingPrice;
    }

    public getCostValue(): number {
        return this.costValue;
    }

    public setCostValue(costValue: number): void {
        this.costValue = costValue;
    }

    public getKitchen(): string {
        return this.kitchen;
    }

    public setKitchen(kitchen: string): void {
        this.kitchen = kitchen;
    }

    public getCostPercentage(): number {
        return this.costPercentage;
    }

    public setCostPercentage(costPercentage: number): void {
        this.costPercentage = costPercentage;
    }

    public getItems(): Array<RecipeItem> {
        return this.items;
    }

    public setItems(items: Array<RecipeItem>): void {
        this.items = items;
    }
}