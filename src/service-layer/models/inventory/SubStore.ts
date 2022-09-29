import { ServiceObject } from "../ServiceObject";
import { InventoryCategories } from "./StoreCategories";

export class SubStore extends ServiceObject {
    private subStoreName: string;
    private storeCategory: Array<InventoryCategories>;

    public getSubStoreName(): string {
        return this.subStoreName;
    }

    public setSubStoreName(subStoreName: string): void {
        this.subStoreName = subStoreName;
    }

    public getStoreCategory(): Array<InventoryCategories> {
        return this.storeCategory;
    }

    public setStoreCategory(storeCategory: Array<InventoryCategories>): void {
        this.storeCategory = storeCategory;
    }


}