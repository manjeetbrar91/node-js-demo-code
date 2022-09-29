import { ServiceObject } from "../ServiceObject";
import { InventoryCostCenterStockReportBaseModel } from "./InventoryCostCenterStockReportBaseModel";
import { Vendor } from "./Vendor";


export class InventoryPOReportResponse extends ServiceObject {
    private restaurant: string;
    private totalNumberOfItems: number;
    private page: number;
    private limit: number;
    private totalPages: number;
    private currentPageItemCount: number;
    private data: Array<VendorModel>;


    public getData(): Array<VendorModel> {
        return this.data;
    }

    public setData(data: Array<VendorModel>): void {
        this.data = data;
    }

    public getRestaurant(): string {
        return this.restaurant;
    }

    public setRestaurant(restaurant: string): void {
        this.restaurant = restaurant;
    }


    public getTotalNumberOfItems(): number {
        return this.totalNumberOfItems;
    }

    public setTotalNumberOfItems(totalNumberOfItems: number): void {
        this.totalNumberOfItems = totalNumberOfItems;
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

export class VendorModel {
    private vendorId: string;
    private vendor: Vendor;
    private poItems: Array<InventoryCostCenterStockReportBaseModel>;

    private invoiceNumber: string;

    public getInvoiceNumber(): string {
        return this.invoiceNumber;
    }

    public setInvoiceNumber(invoiceNumber: string): void {
        this.invoiceNumber = invoiceNumber;
    }

    public getPoItems(): Array<InventoryCostCenterStockReportBaseModel> {
        if (this.poItems == undefined) {
            this.poItems = new Array();
        }
        return this.poItems;
    }

    public setPoItems(poItems: Array<InventoryCostCenterStockReportBaseModel>): void {
        this.poItems = poItems;
    }


    public getVendorId(): string {
        return this.vendorId;
    }

    public setVendorId(vendorId: string): void {
        this.vendorId = vendorId;
    }

    public getVendor(): Vendor {
        return this.vendor;
    }

    public setVendor(vendor: Vendor): void {
        this.vendor = vendor;
    }




}