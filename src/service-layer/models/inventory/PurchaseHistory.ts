import { ServiceObject } from "../ServiceObject";

export enum PurchaseOrderStatus {
    Draft = 'draft',
    Sent = 'sent',
    Closed = 'completed'
}
export enum PurchaseOrderType {
    All = 'all',
    Direct = 'directorder',
    Cash = 'cash',
    Normal = 'purchaseorder'
}

export class PurchaseHistory extends ServiceObject {
    private orderStatus: PurchaseOrderStatus;

    public getOrderStatus(): PurchaseOrderStatus {
        return this.orderStatus;
    }

    public setOrderStatus(orderStatus: PurchaseOrderStatus): void {
        this.orderStatus = orderStatus;
    }

}