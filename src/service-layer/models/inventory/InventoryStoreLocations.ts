import { ServiceObject } from "../ServiceObject";

export class InventoryStoreLocations extends ServiceObject {
    private restaurantId: string;
    private storeLocationName: string;


    public getStoreLocationName(): string {
        return this.storeLocationName;
    }

    public setStoreLocationName(storeLocationName: string): void {
        this.storeLocationName = storeLocationName;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
}