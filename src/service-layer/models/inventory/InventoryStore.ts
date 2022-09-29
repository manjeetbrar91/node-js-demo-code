import { ServiceObject } from "../ServiceObject";
import { InventoryCategories } from "./StoreCategories";
import { SubStore } from "./SubStore";

export class InventoryStore extends ServiceObject {
    private restaurantId: string;
    private storeName: string;
    private storeCategory: Array<InventoryCategories>;
    private subStores: Array<SubStore>;

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getStoreName(): string {
        return this.storeName;
    }

    public setStoreName(storeName: string): void {
        this.storeName = storeName;
    }

    public getStoreCategory(): Array<InventoryCategories> {
        return this.storeCategory;
    }

    public setStoreCategory(storeCategory: Array<InventoryCategories>): void {
        this.storeCategory = storeCategory;
    }

    public getSubStores(): Array<SubStore> {
        return this.subStores;
    }

    public setSubStores(subStores: Array<SubStore>): void {
        this.subStores = subStores;
    }
}