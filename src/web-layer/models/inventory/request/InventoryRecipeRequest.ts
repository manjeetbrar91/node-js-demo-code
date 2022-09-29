import { IsMongoId } from "class-validator";
import { DishType } from "service-layer/models/menumodels/BaseRestaurantDish";

export class InventoryRecipeRequest {
    @IsMongoId()
    restaurant: string;
    page: number;
    limit: number;
    type: string;
    dishType: DishType;
    searchText:string;
}