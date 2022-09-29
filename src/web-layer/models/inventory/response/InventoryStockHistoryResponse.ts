import { ItemStock } from "../../../../service-layer/models/inventory/ItemStock";

export class InventoryStockHistoryResponse {
    private items: Array<ItemStock>;
    private page: number;
    private limit: number;
    private totalPages: number;
    private currentPageItemCount: number;
    private totalNumberOfItems: number;

    public getItems(): Array<ItemStock> {
        return this.items;
    }

    public setItems(items: Array<ItemStock>): void {
        this.items = items;
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

    public getTotalNumberOfItems(): number {
        return this.totalNumberOfItems;
    }

    public setTotalNumberOfItems(totalNumberOfItems: number): void {
        this.totalNumberOfItems = totalNumberOfItems;
    }
}