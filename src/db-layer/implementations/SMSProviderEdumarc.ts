import * as request from 'request-promise-native';
import { Config } from '../../config/Config';
import { ISMSProvider } from '../../db-layer/interfaces/ISMSProvider';
import { SMSResponse } from '../../service-layer/models/SMSResponse';
import { logger } from '../../logs';
import { DBConstants } from '../../db-layer/models/DBConstants';

export class SMSProvider implements ISMSProvider {
    private readonly otpUrl: string;
    private readonly transactionUrl: string;
    private readonly replyHostUrl: string;
    private readonly otpApiKey: string;    
    private readonly transactionApiKey: string;
    private readonly senderId: string;

    constructor() {
        this.otpUrl = Config.getInstance().getOtpUrl();
        this.transactionUrl = Config.getInstance().getTransactionUrl();
		this.replyHostUrl = Config.getInstance().getSmsCallBackUrl();
        this.transactionApiKey = Config.getInstance().geTtransactionApiKey();
        this.senderId = Config.getInstance().getSmsSender();
        this.otpApiKey = Config.getInstance().getOtpApiKey();
    }

    public async sendSMS(numberMessageMap: Array<any>, message: string, senderId: string, templateId: string): Promise<SMSResponse> {
        var options = { 
            method: 'POST',
            url: this.transactionUrl,
            headers: 
            {  
                apikey: this.transactionApiKey,
                'Content-Type': 'application/json' 
            },
            body: this.getRequest(numberMessageMap, message, senderId, templateId),
            json: true 
        };
        try{
            let resp = await request(options);
            let response = this.getSMSResponse(resp, numberMessageMap);
            return response;
        }catch(err){
            logger.error(err, "caught exception while sending message: %s", err.message + ": "+message);
            throw err;
        }
    }

    public async sendOtp(toPhoneNumbers: string, message: string, restaurantSenderId: string = null): Promise<string> {
        restaurantSenderId = restaurantSenderId ? restaurantSenderId : this.senderId;
        var options = { 
            method: 'POST',
            url: this.otpUrl,
            headers: 
            {  
                apikey: this.otpApiKey,
                'Content-Type': 'application/json' 
            },
            body: 
            { 
                number: [toPhoneNumbers],
                message: message,
                senderId: restaurantSenderId,
                dlr_url: this.replyHostUrl,
                templateId: DBConstants.OTPTemplateId
            },
            json: true 
        };
        try{
            let resp = await request(options);
            return resp.data.transactionId;
        }catch(err){
            logger.error(err, "caught exception while sending message: %s", err.message + ": "+message);
            if(err.statusCode === 500) {
                throw err.error.err.msg;
            } else {
                throw err;
            }
        }
    }

    private getRequest(numberMessageMap: Array<any>, message: string, senderId: string, templateId: string) {
        if(templateId) {
            return {
                numberMessageMap: numberMessageMap,
                senderId: senderId,
                dlr_url: this.replyHostUrl,
                templateId: templateId
            }
        }
        return {
            numberMessageMap: numberMessageMap,
            senderId: senderId,
            dlr_url: this.replyHostUrl
        }
    }

    private getSMSResponse(resp, numberMessageMap): SMSResponse {
        let response = new SMSResponse();
        response.setData(resp.data);
        response.setMessage(resp.data.msg);
        response.setTransactionId(resp.data.transactionId);
        response.setSuccess(resp.success);
        return response;
    }
}