import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";

export interface IPushNotificationService {
    sendNotificationToFCM(model: PushNotificationBaseModel, regTokens: string[]): Promise<PushNotificationBaseModel>
    sendNotificationToAPN(model: PushNotificationBaseModel, regTokens: string): Promise<PushNotificationBaseModel>

}