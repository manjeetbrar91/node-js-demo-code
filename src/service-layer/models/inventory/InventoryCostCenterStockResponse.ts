import { ServiceObject } from "../ServiceObject";
import { InventoryCostCenterItemStockModel } from "./InventoryCostCenterItemStockModel";


export class InventoryCostCenterStockResponse extends ServiceObject {
    private restaurant: string;
    private data: Array<InventoryCostCenterItemStockModel>;
    private totalNumberOfItems: number;
    private totalValue: number;
    private page: number;
    private limit: number;
    private totalPages: number;
    private currentPageItemCount: number;

    public getRestaurant(): string {
        return this.restaurant;
    }

    public setRestaurant(restaurant: string): void {
        this.restaurant = restaurant;
    }

    public getData(): Array<InventoryCostCenterItemStockModel> {
        return this.data;
    }

    public setData(data: Array<InventoryCostCenterItemStockModel>): void {
        this.data = data;
    }

    public getTotalNumberOfItems(): number {
        return this.totalNumberOfItems;
    }

    public setTotalNumberOfItems(totalNumberOfItems: number): void {
        this.totalNumberOfItems = totalNumberOfItems;
    }

    public getTotalValue(): number {
        return this.totalValue;
    }

    public setTotalValue(totalValue: number): void {
        this.totalValue = totalValue;
    }

    public getPage(): number {
        return this.page;
    }

    public setPage(page: number): void {
        this.page = page;
    }

    public getLimit(): number {
        return this.limit;
    }

    public setLimit(limit: number): void {
        this.limit = limit;
    }

    public getTotalPages(): number {
        return this.totalPages;
    }

    public setTotalPages(totalPages: number): void {
        this.totalPages = totalPages;
    }

    public getCurrentPageItemCount(): number {
        return this.currentPageItemCount;
    }

    public setCurrentPageItemCount(currentPageItemCount: number): void {
        this.currentPageItemCount = currentPageItemCount;
    }



}