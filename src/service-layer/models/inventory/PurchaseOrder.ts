import { InventoryPurchaseOrderItem } from "./PurchaseOrderItem";
import { PurchaseHistory, PurchaseOrderStatus, PurchaseOrderType } from "./PurchaseHistory";
import { ServiceObject } from "../ServiceObject";

export class InventoryPurchaseOrder extends ServiceObject {
    private restaurantId: string;
    private vendorId: string;
    private managerId: string;
    private orderDate: Date;
    private orderExpectedOn: Date;
    private orderRecievedOn: Date;
    private invoiceNumber: string;
    private items: Array<InventoryPurchaseOrderItem>;
    private subTotal: number;
    private totalAmount: number;
    private totalTax: number;
    private charges: number;
    private totalItems: number;
    private history: Array<PurchaseHistory>;
    private orderStatus: PurchaseOrderStatus;
    private purchaseOrderNumber: number;
    private orderType: PurchaseOrderType;
    private remarks: string;

    public getRemarks(): string {
        return this.remarks;
    }

    public setRemarks(remarks: string): void {
        this.remarks = remarks;
    }


    public getOrderType(): PurchaseOrderType {
        return this.orderType;
    }

    public setOrderType(orderType: PurchaseOrderType): void {
        this.orderType = orderType;
    }


    public getPurchaseOrderNumber(): number {
        return this.purchaseOrderNumber;
    }

    public setPurchaseOrderNumber(purchaseOrderNumber: number): void {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }



    public getOrderStatus(): PurchaseOrderStatus {
        return this.orderStatus;
    }

    public setOrderStatus(orderStatus: PurchaseOrderStatus): void {
        this.orderStatus = orderStatus;
    }


    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getVendorId(): string {
        return this.vendorId;
    }

    public setVendorId(vendorId: string): void {
        this.vendorId = vendorId;
    }

    public getManagerId(): string {
        return this.managerId;
    }

    public setManagerId(managerId: string): void {
        this.managerId = managerId;
    }

    public getOrderDate(): Date {
        return this.orderDate;
    }

    public setOrderDate(orderDate: Date): void {
        this.orderDate = orderDate;
    }

    public getOrderExpectedOn(): Date {
        return this.orderExpectedOn;
    }

    public setOrderExpectedOn(orderExpectedOn: Date): void {
        this.orderExpectedOn = orderExpectedOn;
    }

    public getOrderRecievedOn(): Date {
        return this.orderRecievedOn;
    }

    public setOrderRecievedOn(orderRecievedOn: Date): void {
        this.orderRecievedOn = orderRecievedOn;
    }

    public getInvoiceNumber(): string {
        return this.invoiceNumber;
    }

    public setInvoiceNumber(invoiceNumber: string): void {
        this.invoiceNumber = invoiceNumber;
    }

    public getItems(): Array<InventoryPurchaseOrderItem> {
        return this.items;
    }

    public setItems(items: Array<InventoryPurchaseOrderItem>): void {
        this.items = items;
    }

    public getSubTotal(): number {
        return this.subTotal;
    }

    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }

    public getTotalTax(): number {
        return this.totalTax;
    }

    public setTotalTax(totalTax: number): void {
        this.totalTax = totalTax;
    }

    public getCharges(): number {
        return this.charges;
    }

    public setCharges(charges: number): void {
        this.charges = charges;
    }

    public getTotalItems(): number {
        return this.totalItems;
    }

    public setTotalItems(totalItems: number): void {
        this.totalItems = totalItems;
    }

    public getHistory(): Array<PurchaseHistory> {
        return this.history;
    }

    public setHistory(history: Array<PurchaseHistory>): void {
        this.history = history;
    }
}