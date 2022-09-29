import { InventoryRecipeResponse } from "../../../web-layer/models/response/inventory/InventoryRecipeResponse";
import { InventoryRecipeRequest } from "../../../web-layer/models/inventory/request/InventoryRecipeRequest";
import { BaseRecipe } from "../../../service-layer/models/inventory/BaseRecipe";
import { InventoryMeasurementUnitConverstions } from "../../../service-layer/models/inventory/MeasurementUnitConverstions";

export interface IInventoryRecipeService {
    addOrUpdateRecipe(items: BaseRecipe): Promise<BaseRecipe>;
    getRecipeById(id: string): Promise<BaseRecipe>;
    getSubRecipes(restaurantId: string): Promise<Array<BaseRecipe>>;
    getRecipesByType(params: InventoryRecipeRequest): Promise<InventoryRecipeResponse>;
    getMianRecipesList(params: InventoryRecipeRequest, itemIdArray : Array<string>): Promise<Array<BaseRecipe>>
    getTotalValue(baseRecipe: any,units : Array<InventoryMeasurementUnitConverstions>): Promise<number>
    deleteRecipeById(id:string):Promise<number>;
}