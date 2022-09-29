import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";

export interface INotificationDBManager {
    addNewNotification(data: PushNotificationBaseModel): Promise<PushNotificationBaseModel>
    getDevices(userId: string): Promise<Array<any>>
    deleteOrderNotification(userId:string,orderId:string): Promise<boolean>

}