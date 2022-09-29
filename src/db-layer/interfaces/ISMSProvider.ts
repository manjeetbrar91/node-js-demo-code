import { SMSResponse } from "../../service-layer/models/SMSResponse";

export interface ISMSProvider {
    sendSMS(numberMessageMap: Array<any>, message: string, senderId: string, templateId: string): Promise<SMSResponse>;
    sendOtp(toPhoneNumbers: string, message: string, restaurantSenderId: string): Promise<string>;
}