import * as request from 'request-promise-native';
import { Config } from '../../config/Config';
import { logger } from '../../logs';
import { IUrbanPiperProvider } from '../../db-layer/interfaces/IUrbanPiperProvider';
import { UrbanPiperInfo } from '../../service-layer/models/Restaurant';
import { RestaurantCustomerOrder } from '../../service-layer/models/RestaurantCustomerOrder';
import { IOrderDBManager } from '../../db-layer/interfaces/IOrderDBManager';
import { DBManagerFactory } from '../../db-layer/DataAccessLayerFactory';
import { OrderBill } from '../../service-layer/models/OrderBill';
import { IBillDBManager } from '../../db-layer/interfaces/IBillDBManager';

export class UrbanPiperProvider implements IUrbanPiperProvider {
    private readonly url: string;
    private readonly baseUrl: string;
    private orderDBManager: IOrderDBManager;
    private billDBManager: IBillDBManager;

    constructor() {
        this.url = Config.getInstance().getUrbanPiperUrl();
        this.baseUrl = Config.getInstance().getUrbanPiperBaseUrl();
        this.orderDBManager = DBManagerFactory.getOrderDBManager();
        this.billDBManager = DBManagerFactory.getBillDBManager();
    }

    public async updateStatus(urbanPiperInfo: UrbanPiperInfo, orderId: string, status: string, message: string): Promise<any> {
        var options = { 
            method: 'PUT',
            url: this.url + "orders/"+ orderId + "/status/",
            headers: 
            {  
                'Authorization': urbanPiperInfo.getUserName()+ ":" + urbanPiperInfo.getApiKey(),
                'Content-Type': 'application/json'
            },
            body: 
            { 
                new_status: status,
                message: message
            },
            json: true 
        };
        try{
            let resp = await request(options);
            return resp;
        }catch(err){
            logger.error(err, "caught exception while updating order status in URban Piper: %s", err.message + ": "+orderId +" : "+status);
            throw err;
        }
    }

    public async manageCatalogue(urbanPiperInfo: UrbanPiperInfo, accountId: string, requestBody: any): Promise<any> {
        var options = { 
            method: 'POST',
            url: this.url + "inventory/locations/"+accountId+"/",
            headers: 
            {  
                'Authorization': urbanPiperInfo.getUserName()+ ":" + urbanPiperInfo.getApiKey(),
                'Content-Type': 'application/json' 
            },
            body: requestBody,
            json: true 
        };
        try{
            let resp = await request(options);
            return resp;
        }catch(err){
            logger.error(err, "caught exception while managing catalogue in URban Piper: %s", err.message + ": "+accountId +" : "+requestBody);
            throw err;
        }
    }

    public async updateChannelItemStatus(urbanPiperInfo: UrbanPiperInfo, dishId: string, restaurantId: string, status: boolean): Promise<any> {
        var options = { 
            method: 'POST',
            url: this.baseUrl + 'hub/api/v1/items/',
            headers: 
            {  
                'Authorization': urbanPiperInfo.getUserName()+ ":" + urbanPiperInfo.getApiKey(),
                'Content-Type': 'application/json'
            },
            body: 
            {
                "location_ref_id": restaurantId,
                "item_ref_ids": [dishId],
                "action": status ? 'enable' : 'disable'
            },
            json: true 
        };
        try{
            let resp = await request(options);
            return resp;
        }catch(err){
            logger.error(err, "caught exception while updating item status in URban Piper: %s", err.message + ": "+dishId +" : "+status);
            // throw err;
        }
    }

    public async updateStoreStatus(urbanPiperInfo: UrbanPiperInfo, restaurantId: string, status: boolean, platform: string): Promise<any> {
        var options = { 
            method: 'POST',
            url: this.baseUrl + 'hub/api/v1/location/',
            headers: 
            {  
                'Authorization': urbanPiperInfo.getUserName()+ ":" + urbanPiperInfo.getApiKey(),
                'Content-Type': 'application/json'
            },
            body: 
            {
                "location_ref_id": restaurantId,
                "platforms": [platform],
                "action": status ? 'enable' : 'disable'
            },
            json: true 
        };
        try{
            let resp = await request(options);
            return resp;
        }catch(err){
            logger.error(err, "caught exception while updating store status in Urban Piper: %s", err.message + ": "+restaurantId +" : "+status);
            throw err;
        }
    }

    public async updateRiderTemperature(urbanPiperInfo: UrbanPiperInfo, orderId: string, refUrbanPiperId: string, temperature: number, phoneNumber: string): Promise<any> {
        var options = { 
            method: 'POST',
            url: this.url + 'aggregator/zomato/feature-action/',
            headers: 
            {  
                'Authorization': urbanPiperInfo.getUserName()+ ":" + urbanPiperInfo.getApiKey(),
                'Content-Type': 'application/json'
            },
            body: 
            {
                "action": 'rider_body_temp',
                "order_id": refUrbanPiperId,
                "temp": temperature,
                "Phone": phoneNumber
            },
            json: true 
        };
        try{
            let updatedOrder: RestaurantCustomerOrder = await this.orderDBManager.updateRiderTemperature(orderId, temperature);
            let updatedBill: OrderBill = await this.billDBManager.updateRiderTemperature(orderId, temperature);
            let resp = await request(options);
            return resp;
        }catch(err){
            logger.error(err, "caught exception while updating rider temperature in Urban Piper: %s", err.message + ": "+orderId +" : "+phoneNumber);
            throw err;
        }
    }

    public async updateRiderMaskCheck(urbanPiperInfo: UrbanPiperInfo, orderId: string, refUrbanPiperId: string, wearingMask: boolean): Promise<any> {
        var options = { 
            method: 'POST',
            url: this.url + 'aggregator/zomato/feature-action/',
            headers: 
            {  
                'Authorization': urbanPiperInfo.getUserName()+ ":" + urbanPiperInfo.getApiKey(),
                'Content-Type': 'application/json'
            },
            body: 
            {
                "action": 'rider_with_mask',
                "order_id": refUrbanPiperId,
                "wearing_mask": wearingMask
            },
            json: true
        };
        try{
            let updatedOrder: RestaurantCustomerOrder = await this.orderDBManager.updateRiderMaskCheck(orderId, wearingMask);
            let updatedBill: OrderBill = await this.billDBManager.updateRiderMaskCheck(orderId, wearingMask);
            let resp = await request(options);
            return resp;
        }catch(err){
            logger.error(err, "caught exception while updating rider mask check in Urban Piper: %s", err.message + ": "+orderId +" : "+wearingMask);
            throw err;
        }
    }
}