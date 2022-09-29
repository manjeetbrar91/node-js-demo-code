import { ServiceObject } from '../../../../service-layer/models/ServiceObject';

export class InventoryCostCenterConsumptionOrderItemModel extends ServiceObject {

    private totalPrice: number;
    private totalQty: number;
    private orderItemId: string;

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    public getTotalQty(): number {
        return this.totalQty;
    }

    public setTotalQty(totalQty: number): void {
        this.totalQty = totalQty;
    }

    public getOrderItemId(): string {
        return this.orderItemId;
    }

    public setOrderItemId(orderItemId: string): void {
        this.orderItemId = orderItemId;
    }



}