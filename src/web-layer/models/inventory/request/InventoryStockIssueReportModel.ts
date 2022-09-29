import { IsMongoId } from 'class-validator';

export class InventoryStockIssueReportModel {
    @IsMongoId()
    restaurantId: string;
    kitchenId: string;
    invoiceNumber: string;
    vendorIdArray: [];
    itemName: string;
    categoryId: string;
    kitchenIdArray: [];
    page: number;
    limit: number;
    startDate: any;
    endDate: any;
    previousStartDate: Date;
    previousEndDate: Date;
    searchText: string;
}