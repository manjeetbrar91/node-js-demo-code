import { ServiceObject } from "../ServiceObject";
import { Vendor } from "./Vendor";

export class InventoryVendorResponseModel extends ServiceObject {
    private vendors: Array<Vendor>;
    private currentPageItemCount: number;
    private totalItemCount: number;
    private page: number;
    private limit: number;
    private totalPages: number;

    public getVendors(): Array<Vendor> {
        return this.vendors;
    }

    public setVendors(vendors: Array<Vendor>): void {
        this.vendors = vendors;
    }

    public getCurrentPageItemCount(): number {
        return this.currentPageItemCount;
    }

    public setCurrentPageItemCount(currentPageItemCount: number): void {
        this.currentPageItemCount = currentPageItemCount;
    }

    public getTotalItemCount(): number {
        return this.totalItemCount;
    }

    public setTotalItemCount(totalItemCount: number): void {
        this.totalItemCount = totalItemCount;
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


}