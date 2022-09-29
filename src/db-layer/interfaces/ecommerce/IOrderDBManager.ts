import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetUserOrderRequestModel } from "../../../web-layer/models/ecommerce/request/GetUserOrderRequestModel";
import { CustomerOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";
import { OrderStatusEnum } from "../../../service-layer/models/ecommerce/OrderStatusEnum";
import { RescheduleAppointmentModel } from "../../../web-layer/models/ecommerce/request/RescheduleAppointmentModel";
 export interface IOrderDBManager {
    createOrder(data: CustomerOrderModel): Promise<CustomerOrderModel>
    updateOrder(data: CustomerOrderModel): Promise<CustomerOrderModel>
    getUserOrders(data: GetUserOrderRequestModel): Promise<ResultModel>
    getOrderDetailsByOrderId(orderId: string): Promise<CustomerOrderModel>
    updateOrderPaymentStatus(orderId: string, order: CustomerOrderModel): Promise<CustomerOrderModel>
    getBusinessOrders(data: GetUserOrderRequestModel): Promise<ResultModel>
    getBusinessOrderDetailsByOrderId(orderId: string): Promise<CustomerOrderModel>
    updateChannelOrderStatus(orderId: string, status: OrderStatusEnum): Promise<CustomerOrderModel>
    rescheduleAppointmentBusiness(data : RescheduleAppointmentModel): Promise<CustomerOrderModel>
    updateAppointment(data: CustomerOrderModel): Promise<CustomerOrderModel>
    getOrdersCountByProductId(productId: string): Promise<number> 
    getOrdersCountByVariantId(variantId: string): Promise<number> 
    isAlreadyReached(orderId: string, alreadyReached: boolean): Promise<CustomerOrderModel>
}