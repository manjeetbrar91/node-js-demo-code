import { ServiceObject } from './ServiceObject';
import { QRCode } from './QRCode';
export class Table extends ServiceObject {
    private numberOfPeople: number;
    private restaurantId: string;
    private waiterId: Array<string>;
    private tableName: string;
    private available: boolean;
    private totalBill: number;
    private section: string;
    private orderId: string;
    private assignedWaiterId: string;
    private orderStartTS: string;
    private category: string;
    private sortOrder: number;
    private occupancyStatus: number;
    private qrCodes: QRCode;
    private preparedItemsCount: number;
    private preparingItemsCount: number;
    private revenue: number;
    private billGenerated: boolean;


    public isBillGenerated(): boolean {
        return this.billGenerated;
    }

    public setBillGenerated(billGenerated: boolean): void {
        this.billGenerated = billGenerated;
    }

     


    public getTotalBill(): number {
        return this.totalBill;
    }

    public setTotalBill(totalBill: number): void {
        this.totalBill = totalBill;
    }
    public getRevenue(): number {
        return this.revenue;
    }

    public setRevenue(revenue: number): void {
        this.revenue = Number(revenue.toFixed(2));
    }
    public getPreparedItemsCount(): number {
        return this.preparedItemsCount;
    }

    public setPreparedItemsCount(preparedItemsCount: number): void {
        this.preparedItemsCount = preparedItemsCount;
    }

    public getPreparingItemsCount(): number {
        return this.preparingItemsCount;
    }

    public setPreparingItemsCount(preparingItemsCount: number): void {
        this.preparingItemsCount = preparingItemsCount;
    }

    public getOccupancyStatus(): number {
        return this.occupancyStatus;
    }

    public setOccupancyStatus(occupancyStatus: number): void {
        this.occupancyStatus = occupancyStatus;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getOrderStartTS(): string {
        return this.orderStartTS;
    }

    public setOrderStartTS(orderStartTS: string): void {
        this.orderStartTS = orderStartTS;
    }

    public getAssignedWaiterId(): string {
        return this.assignedWaiterId;
    }

    public setAssignedWaiterId(orderId: string): void {
        this.assignedWaiterId = orderId;
    }

    public isAvailable(): boolean {
        return this.available;
    }

    public setAvailable(available: boolean): void {
        this.available = available;
    }

    public getTableName(): string {
        return this.tableName;
    }

    public setTableName(tableName: string): void {
        this.tableName = tableName;
    }

    public getNumberOfPeople(): number {
        return this.numberOfPeople;
    }

    public setNumberOfPeople(numberOfPeople: number): void {
        this.numberOfPeople = numberOfPeople;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getSection(): string {
        return this.section;
    }

    public setSection(section: string): void {
        this.section = section;
    }

    public getWaiterId(): Array<string> {
        return this.waiterId;
    }

    public setWaiterId(waiterId: Array<string>): void {
        this.waiterId = waiterId;
    }

    public addWaiterId(waiterId: string): void {
        this.waiterId.push(waiterId);
    }

    public setSortOrder(order: number): void {
        this.sortOrder = order;
    }

    public getSortOrder(): number {
        return this.sortOrder;
    }

    public getQRCodes(): QRCode {
        return this.qrCodes;
    }

    public setQRCodes(qrCodes: QRCode) {
        this.qrCodes = qrCodes;
    }
}

