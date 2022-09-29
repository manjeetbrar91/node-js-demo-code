import * as mongoose from "mongoose";
import { IEcommerceNotificationService } from "../../../service-layer/interfaces/ecommerce/IEcommerceNotificationService";
import { EcommerceNotificationsUtility } from "../../../common/utils/ecommerce/EcommerceNotificationsUtility";
import { IBusinessService } from "../../../service-layer/interfaces/ecommerce/IBusinessService";
import { IUserOrderService } from "../../../service-layer/interfaces/ecommerce/IUserOrderService";
import { CustomerOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";
import { EcommercePushNotificationExtraDataModel, PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";
import { ServiceFactory } from "../../../service-layer/ServiceFactory";
import { INotificationDBManager } from "../../../db-layer/interfaces/ecommerce/INotificationDBManager";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IPushNotificationService } from "../../../service-layer/interfaces/ecommerce/IPushNotificationService";

export class EcommerceNotificationService implements IEcommerceNotificationService {
    private orderService: IUserOrderService;
    private businessService: IBusinessService;
    private readonly notificationDBManager: INotificationDBManager;
    private readonly pushNotificationService: IPushNotificationService;
    constructor() {
        this.pushNotificationService = ServiceFactory.getPushNotificationService();
        this.businessService = ServiceFactory.getBusinessService();
        this.orderService = ServiceFactory.getUserOrderService();
        this.notificationDBManager = DBManagerFactory.getNotificationDBManager();

    }
    public async getNotificationExtraData(order: CustomerOrderModel): Promise<EcommercePushNotificationExtraDataModel> {
        let extra = new EcommercePushNotificationExtraDataModel();
        extra.setUserId(new mongoose.Types.ObjectId(order.getUserId()))
        extra.setBusinessId(new mongoose.Types.ObjectId(order.getBusinessId()))
        extra.setOrderId(new mongoose.Types.ObjectId(order.getId()))
        extra.setType(order.getChannelOrderStatus())
        extra.setBillNumber(order.getBillNumber())

        return extra;
    }
    public async getBusinessOwnerId(businessId: string): Promise<string> {
        return await (await this.businessService.getBusinessById(businessId)).getOwnerId()
    }
    public async newOrderNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.newOrderNotification(customerName);
        notification.setUserId(await this.getBusinessOwnerId(order.getBusinessId()))
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }



    public async orderRejectedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.orderRejectedNotification(order.getBusinessName())
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async appointmentAcceptedByCustomerNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.appointmentAcceptedByCustomerNotification(customerName);
        notification.setUserId(await this.getBusinessOwnerId(order.getBusinessId()))
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification

    }

    public async customerRequestedRescheduleNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.customerRequestedRescheduleNotification(customerName);
        notification.setUserId(await this.getBusinessOwnerId(order.getBusinessId()))
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async paymentRequestNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.paymentRequestNotification(order.getBusinessName());
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async appointmentStartedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.appointmentStartedNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async appointmentCompletedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);

        let notification = EcommerceNotificationsUtility.appointmentCompletedNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async orderUpdatedByBusinessNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.orderUpdatedByBusinessNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async orderDeliveredNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.orderDeliveredNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async orderDispatchedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.orderDispatchedNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async orderReadyForPickupNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.orderReadyForPickupNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }




    public async orderAcceptedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.orderAcceptedNotification(order.getBusinessName());
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async businessRequestedRescheduleNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.businessRequestedRescheduleNotification(order.getBusinessName());
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }



    public async orderCancelledByCustomerNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.orderCancelledByCustomerNotification(customerName, order.getBillNumber());
        notification.setUserId(await this.getBusinessOwnerId(order.getBusinessId()))
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async appointmentRejectedByBusinessNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.appointmentRejectedByBusinessNotification(order.getBusinessName(), order.getBillNumber());
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async orderOutForDeliveryNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.orderOutForDeliveryNotification(order.getBillNumber());
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async orderPickedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        let notification = EcommerceNotificationsUtility.orderPickedNotification();
        notification.setUserId(order.getUserId())
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }
    public async sendNotification(model: PushNotificationBaseModel): Promise<PushNotificationBaseModel> {
        let fcmTokens = new Array();
        let iosTokens = new Array();
        let userId = model.getUserId()


        let devices = await this.notificationDBManager.getDevices(userId)
        if (devices && devices[0]) {

            for (let d of devices) {
                if (d.deviceType == 'IOS') {
                    iosTokens.push(d.pushToken)
                } else {
                    fcmTokens.push(d.pushToken)
                }
            }
            if (fcmTokens.length > 0) {
                try {


                    await this.pushNotificationService.sendNotificationToFCM(model, fcmTokens);
                } catch (err) {
                }
            }
            for (let iosToken of iosTokens) {
                try { 
                    await    this.pushNotificationService.sendNotificationToAPN(model, iosToken);
                } catch (err) {
                    console.log(err);                    
                }


            }
        }


        return model;
    }

    public async deleteOrderNotification(userId: string, orderId: string): Promise<boolean> {

        return await this.notificationDBManager.deleteOrderNotification(userId, orderId)

    }


    public async customerReachedNotification(orderId: string): Promise<PushNotificationBaseModel> {
        let order = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let customerName = order.getUser() && order.getUser().getFirstName()
        let notification = EcommerceNotificationsUtility.customerReachedNotification(customerName, order.getBillNumber());
        notification.setUserId(await this.getBusinessOwnerId(order.getBusinessId()))
        notification.setExtra(await this.getNotificationExtraData(order));
        await this.notificationDBManager.addNewNotification(notification)
        this.sendNotification(notification)
        return notification
    }

    public async lowStockNotification(businessId: string, count: number): Promise<PushNotificationBaseModel> {
        let notification = EcommerceNotificationsUtility.lowStockNotification(count);
        try {
            notification.setUserId(await this.getBusinessOwnerId(businessId))
            let extra = new EcommercePushNotificationExtraDataModel();
            extra.setUserId(new mongoose.Types.ObjectId(notification.getUserId().toString()))
            extra.setBusinessId(new mongoose.Types.ObjectId(businessId))
            extra.setOrderId(null)
            extra.setType("lowStock")
            extra.setBillNumber(null)
            notification.setExtra(extra)
            await this.notificationDBManager.addNewNotification(notification)
            this.sendNotification(notification)
        } catch (err) {
            console.log(err);

        }
        return notification
    }
}