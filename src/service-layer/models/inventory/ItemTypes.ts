import { ServiceObject } from "../ServiceObject";

export class InventoryItemTypes extends ServiceObject {
    private restaurantId: string;
    private itemType: string;


    public getItemType(): string {
        return this.itemType;
    }

    public setItemType(itemType: string): void {
        this.itemType = itemType;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }



}