import { ServiceObject } from "../ServiceObject";
import { InventoryCostCenterItemStockReportModel } from "./InventoryCostCenterItemStockReportModel";


export class InventoryCostCenterStockReportBaseModel extends ServiceObject {

    private categoryName: string;
    private categoryId: string;
    private items: Array<InventoryCostCenterItemStockReportModel>;


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

    public getItems(): Array<InventoryCostCenterItemStockReportModel> {
        if (this.items == undefined) {
            this.items = new Array();
        }
        return this.items;
    }

    public setItems(items: Array<InventoryCostCenterItemStockReportModel>): void {
        this.items = items;
    }


}