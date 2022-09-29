import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";

export interface IEcommerceNotificationService {
    getBusinessOwnerId(businessId: string): Promise<string>
    newOrderNotification(orderId: string): Promise<PushNotificationBaseModel>;
    orderRejectedNotification(orderId: string): Promise<PushNotificationBaseModel>
    appointmentAcceptedByCustomerNotification(orderId: string): Promise<PushNotificationBaseModel>
    customerRequestedRescheduleNotification(orderId: string): Promise<PushNotificationBaseModel>
    paymentRequestNotification(orderId: string): Promise<PushNotificationBaseModel>
    appointmentStartedNotification(orderId: string): Promise<PushNotificationBaseModel>
    appointmentCompletedNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderUpdatedByBusinessNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderDeliveredNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderDispatchedNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderReadyForPickupNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderAcceptedNotification(orderId: string): Promise<PushNotificationBaseModel>
    businessRequestedRescheduleNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderCancelledByCustomerNotification(orderId: string): Promise<PushNotificationBaseModel>
    appointmentRejectedByBusinessNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderOutForDeliveryNotification(orderId: string): Promise<PushNotificationBaseModel>
    orderPickedNotification(orderId: string): Promise<PushNotificationBaseModel>;
    deleteOrderNotification(userId: string, orderId: string): Promise<boolean> 
    customerReachedNotification(orderId: string): Promise<PushNotificationBaseModel>
    lowStockNotification(businessId: string, count: number): Promise<PushNotificationBaseModel> 
}