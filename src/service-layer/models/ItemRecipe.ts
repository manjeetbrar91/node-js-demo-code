import { IngredientObserved } from './InventoryIngredient';
import { ServiceObject } from './ServiceObject';

export class ItemRecipe  extends ServiceObject{
    private itemId: string;
    private ingredientsObserved: Array<IngredientObserved>;

    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getIngredientsObserved(): Array<IngredientObserved> {
        return this.ingredientsObserved;
    }

    public setIngredientsObserved(ingredientsObserved: Array<IngredientObserved>): void {
        this.ingredientsObserved = ingredientsObserved;
    }

}