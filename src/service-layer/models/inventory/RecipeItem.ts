import { BaseRecipeItem } from "./BaseRecipeItem";
import { InventoryRecipe } from "./InventoryRecipe";
import { Item } from "../../../service-layer/models/inventory/Item";

export class RecipeItem extends BaseRecipeItem{
    private recipeId: string;
    private storeName: string;
    private itemId: string;
    private item: Item;
    private recipe: InventoryRecipe;
    private storeId: string;

    public getStoreId(): string {
        return this.storeId;
    }

    public setStoreId(storeId: string): void {
        this.storeId = storeId;
    }


    public getItem(): Item {
        return this.item;
    }

    public setItem(item: Item): void {
        this.item = item;
    }

    public getRecipe(): InventoryRecipe {
        return this.recipe;
    }

    public setRecipe(recipe: InventoryRecipe): void {
        this.recipe = recipe;
    }

    public getStoreName(): string {
        return this.storeName;
    }

    public setStoreName(storeName: string): void {
        this.storeName = storeName;
    }

    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getRecipeId(): string {
        return this.recipeId;
    }

    public setRecipeId(recipeId: string): void {
        this.recipeId = recipeId;
    }
}