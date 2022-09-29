import { EcommerceNotificationsUtility } from "../../common/utils/ecommerce/EcommerceNotificationsUtility";

export class PushNotificationBaseModel {

    private title: string;
    private message: string;
    private clickAction: string;
    private userId: string;
    private type: string;
    private extra: EcommercePushNotificationExtraDataModel;
    private receiver: string;




    constructor(title: string, message: string, clickAction?: string) {
        this.title = title;
        this.message = message;
        if (clickAction != undefined) {
            this.clickAction = clickAction;
        } else {
            this.clickAction = EcommerceNotificationsUtility.NOTIFICATION_TYPE_ECOMMERCE
        }
    }

    public getReceiver(): string {
        return this.receiver;
    }

    public setReceiver(receiver: string): void {
        this.receiver = receiver;
    }
    public getClickAction(): string {
        return this.clickAction;
    }

    public setClickAction(clickAction: string): void {
        this.clickAction = clickAction;
    }

    public getUserId(): string {
        
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
        this.setReceiver(userId)
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }


    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }
    public getExtra(): EcommercePushNotificationExtraDataModel {
        return this.extra;
    }

    public setExtra(extra: EcommercePushNotificationExtraDataModel): void {
        this.extra = extra;
    }




}
export class EcommercePushNotificationExtraDataModel {
    private orderId: string
    private userId: string
    private billNumber: string
    private type: string
    private businessId: string

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getBillNumber(): string {
        return this.billNumber;
    }

    public setBillNumber(billNumber: string): void {
        this.billNumber = billNumber;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getBusinessId(): string {
        return this.businessId;
    }

    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
    }


}