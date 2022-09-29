import { ServiceObject } from "../ServiceObject";
import { InventoryCostCenterItemStockReportModel } from "./InventoryCostCenterItemStockReportModel";
import { InventoryStoreStockClosingModel } from "./InventoryStoreStockClosingModel";


export class InventoryStockClosingReportBaseModel extends ServiceObject {

    private categoryName: string;
    private categoryId: string;
    private items: Array<InventoryStoreStockClosingItemsModel>;


    public getCategoryName(): string {
        return this.categoryName;
    }

    public setCategoryName(categoryName: string): void {
        this.categoryName = categoryName;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getItems(): Array<InventoryStoreStockClosingItemsModel> {
        if (this.items == undefined) {
            this.items = new Array();
        }
        return this.items;
    }

    public setItems(items: Array<InventoryStoreStockClosingItemsModel>): void {
        this.items = items;
    }


}
export class InventoryStoreStockClosingItemsModel {
    private itemId: string;
    private itemName: string;
    private variants: Array<InventoryStoreStockClosingModel>;

    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public getVariants(): Array<InventoryStoreStockClosingModel> {
        if (this.variants == undefined) {
            this.variants = new Array();
        }
        return this.variants;
    }

    public setVariants(variants: Array<InventoryStoreStockClosingModel>): void {
        this.variants = variants;
    }


}
