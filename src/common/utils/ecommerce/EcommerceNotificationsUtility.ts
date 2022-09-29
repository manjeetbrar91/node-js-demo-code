import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";



export class EcommerceNotificationsUtility {

   public static readonly NOTIFICATION_TYPE_ECOMMERCE = "eCommerce";
   public static newOrderNotification(customerName: string): PushNotificationBaseModel {
      let title = "New Order"
      let message = `New order placed by ${customerName}`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("FSO");
      return notifcation;
   }
   public static orderRejectedNotification(businessName: string): PushNotificationBaseModel {
      let title = "Order Rejected"
      let message = `Order Rejected by business ${businessName}`

      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static appointmentAcceptedByCustomerNotification(customerName: string): PushNotificationBaseModel {
      let title = "Appointment updated"
      let message = `${customerName} has accepted the updated appointment`

      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("FSO");
      return notifcation;
   }

   public static customerRequestedRescheduleNotification(customerName: string): PushNotificationBaseModel {
      let title = "Appointment Rescheduled"

      let message = `${customerName} has requested to reschedule the appointment`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("FSO");
      return notifcation;
   }
   public static paymentRequestNotification(businessName: string): PushNotificationBaseModel {
      let title = "Payment request"

      let message = `${businessName} has sent payment request`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static appointmentStartedNotification(): PushNotificationBaseModel {
      let title = "Appointment Started"

      let message = `Your appointmnet is In-progress`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static appointmentCompletedNotification(): PushNotificationBaseModel {
      let title = "Appointment Completed"

      let message = `Your appointment has been successfully completed`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static orderUpdatedByBusinessNotification(): PushNotificationBaseModel {
      let title = "Appointment modified"

      let message = `Your appointment has been modified`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static orderDeliveredNotification(): PushNotificationBaseModel {
      let title = "Order Delivered"

      let message = `Order Delivered`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static orderDispatchedNotification(): PushNotificationBaseModel {
      let title = "Order dispatched"

      let message = `Your order has been dispatched`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static orderReadyForPickupNotification(): PushNotificationBaseModel {
      let title = "Order ready for pick-up"

      let message = `Your order is ready for pick-up`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }




   public static orderAcceptedNotification(businessName: string): PushNotificationBaseModel {
      let title = "Order accepted"
      let message = `Order accepted by ${businessName} `

      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static businessRequestedRescheduleNotification(businessName: string): PushNotificationBaseModel {
      let title = "Reschedule Requested"

      let message = `${businessName} has requested to reschedule the appointment`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   // public static newOrderNotification(): PushNotificationBaseModel {
   //    let title = ""

   //    let message = `${customerName} has accepted the rescheduled appointment`
   //    let notifcation = new PushNotificationBaseModel(title, message);
   // notifcation.setType("");
   // return notifcation;
   // }
   public static orderCancelledByCustomerNotification(customerName: string, orderNumber: string): PushNotificationBaseModel {
      let title = "Order cancelled"

      let message = `${customerName} has cancelled the order #${orderNumber}`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("FSO");
      return notifcation;
   }
   public static customerReachedNotification(customerName: string, orderNumber: string): PushNotificationBaseModel {
      let title = "Customer Reached"

      let message = `${customerName} has reached to pick the order #${orderNumber}`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("FSO");
      return notifcation;
   }
   public static appointmentRejectedByBusinessNotification(businessName: string, orderNumber: string): PushNotificationBaseModel {
      let title = "Appointment rejected"

      let message = `${businessName} has rejected your appointment  ${orderNumber}`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static orderOutForDeliveryNotification(orderNumber: string): PushNotificationBaseModel {
      let title = "Out for delivery"

      let message = `Your order( ${orderNumber})  is on the way`
      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static orderPickedNotification(): PushNotificationBaseModel {
      let title = "Order picked"
      let message = `Order picked up for delivery`

      let notifcation = new PushNotificationBaseModel(title, message);
      notifcation.setType("VCO");
      return notifcation;
   }
   public static lowStockNotification(count:number): PushNotificationBaseModel {
      let title = "Stock Alert"
      let message = `${count} product(s) are out of stock or stock is low`

      let notifcation = new PushNotificationBaseModel(title, message,'stockAlert');
      notifcation.setType("FSO");
      return notifcation;
   }

}

