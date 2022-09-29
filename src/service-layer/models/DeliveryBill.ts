import { ServiceObject } from "./ServiceObject";

export class DeliveryBill extends ServiceObject {
    private orderId: string;
    private deliveryCharges: number;
    private billNumber: number;

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string
    ) {
        this.orderId = orderId;
    }

    public getDeliveryCharges(): number {
        return this.deliveryCharges;
    }

    public setDeliveryCharges(deliveryCharges: number
    ) {
        this.deliveryCharges = deliveryCharges;
    }

    public getBillNumber(): number {
        return this.billNumber;
    }

    public setBillNumber(billNumber: number) {
        this.billNumber = billNumber;
    }


}