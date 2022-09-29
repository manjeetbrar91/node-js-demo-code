import { Item } from "../../../../service-layer/models/inventory/Item";
import { ItemStock } from "../../../../service-layer/models/inventory/ItemStock";

export class StockHistoryResponse {
    private history:  Array<ItemStock>;
    private tags: Array<string>;
    private lastDate: string;
    private item: Item;
    private page: number;
    private limit: number;
    private totalItems: number;
    private currentPageItems: number;
    private lastMonthBalance: number;
    private lastMonthTag: string;
    private lastMonthBalanceUnit: string;
    private currentBalance: string;

    public getCurrentBalance(): string {
        return this.currentBalance;
    }

    public setCurrentBalance(currentBalance: string): void {
        this.currentBalance = currentBalance;
    }

    public getLastMonthBalanceUnit(): string {
        return this.lastMonthBalanceUnit;
    }

    public setLastMonthBalanceUnit(lastMonthBalanceUnit: string): void {
        this.lastMonthBalanceUnit = lastMonthBalanceUnit;
    }

    public getLastMonthBalance(): number {
        return this.lastMonthBalance;
    }

    public setLastMonthBalance(lastMonthBalance: number): void {
        this.lastMonthBalance = lastMonthBalance;
    }

    public getLastMonthTag(): string {
        return this.lastMonthTag;
    }

    public setLastMonthTag(lastMonthTag: string): void {
        this.lastMonthTag = lastMonthTag;
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

    public getTotalItems(): number {
        return this.totalItems;
    }

    public setTotalItems(totalItems: number): void {
        this.totalItems = totalItems;
    }

    public getCurrentPageItems(): number {
        return this.currentPageItems;
    }

    public setCurrentPageItems(currentPageItems: number): void {
        this.currentPageItems = currentPageItems;
    }

    public getHistory(): Array<ItemStock> {
        return this.history;
    }

    public setHistory(history: Array<ItemStock>): void {
        this.history = history;
    }

    public getTags(): Array<string> {
        return this.tags;
    }

    public setTags(tags: Array<string>): void {
        this.tags = tags;
    }

    public getLastDate(): string {
        return this.lastDate;
    }

    public setLastDate(lastDate: string): void {
        this.lastDate = lastDate;
    }

    public getItem(): Item {
        return this.item;
    }

    public setItem(item: Item): void {
        this.item = item;
    }
}