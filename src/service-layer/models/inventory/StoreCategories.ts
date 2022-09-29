import { ServiceObject } from "../ServiceObject";

export class InventoryCategories extends ServiceObject {
    private categoryName: string;    
    private storeId: string;


    public getStoreId(): string {
        return this.storeId;
    }

    public setStoreId(storeId: string): void {
        this.storeId = storeId;
    }
    public getCategoryName(): string {
        return this.categoryName;
    }
    public setCategoryName(categoryName: string): void {
        this.categoryName = categoryName;
    }

}