import { Item } from "../../../service-layer/models/inventory/Item";
import { ServiceObject } from "../ServiceObject";
 import { RecipeType } from "./InventoryRecipe";
import { InventoryMeasurementUnitConverstions } from "./MeasurementUnitConverstions";
export class BaseRecipe extends ServiceObject {
    private restaurantId: string;
    private name: string;
    private type: RecipeType;
    private itemId: string;
    private unitDetails: InventoryMeasurementUnitConverstions;
    private inventoryItems: Array<Item>;
    private recipeitems: Array<Item>;
    private recipeList: Array<BaseRecipe>;
    private variantName: string;
    private variantValue: string;

    public getVariantName(): string {
        return this.variantName;
    }

    public setVariantName(variantName: string): void {
        this.variantName = variantName;
    }

    public getVariantValue(): string {
        return this.variantValue;
    }

    public setVariantValue(variantValue: string): void {
        this.variantValue = variantValue;
    }


    public getUnitDetails(): InventoryMeasurementUnitConverstions {
        return this.unitDetails;
    }

    public setUnitDetails(unitDetails: InventoryMeasurementUnitConverstions): void {
        this.unitDetails = unitDetails;
    }

    public getInventoryItems(): Array<Item> {
        return this.inventoryItems;
    }

    public setInventoryItems(inventoryItems: Array<Item>): void {
        this.inventoryItems = inventoryItems;
    }

    public getRecipeitems(): Array<Item> {
        return this.recipeitems;
    }

    public setRecipeitems(recipeitems: Array<Item>): void {
        this.recipeitems = recipeitems;
    }

    public getRecipeList(): Array<BaseRecipe> {
        return this.recipeList;
    }

    public setRecipeList(recipeList: Array<BaseRecipe>): void {
        this.recipeList = recipeList;
    }


    constructor(type: RecipeType) {
        super();
        this.type = type;
    }

    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getType(): RecipeType {
        return this.type;
    }

    public setType(type: RecipeType): void {
        this.type = type;
    }
}