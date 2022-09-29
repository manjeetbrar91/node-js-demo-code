
import { BusinessAvailabilityEnum } from "../../../service-layer/models/ecommerce/BusinessAvailabilityEnum";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IBusinessDBManager } from "../../../db-layer/interfaces/ecommerce/IBusinessDBManager";
import { IBusinessService } from "../../../service-layer/interfaces/ecommerce/IBusinessService";
import { BusinessCurrencyModel, BusinessDeliverySettings, BusinessPaymentSettings, BusinessResponseModel, BusinessTimingModel } from "../../../service-layer/models/ecommerce/response/BusinessResponseModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetBuisnessRequestModel";
import { GetNearByBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetNearByBuisnessRequestModel";

export class BusinessService implements IBusinessService {

    private readonly businessDBManager: IBusinessDBManager;

    constructor() {
        this.businessDBManager = DBManagerFactory.getBusinessDBManager();
    }

    public async addNewBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> {
        return await this.businessDBManager.addNewBusiness(data);
    }

    public async updateBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> {
        return await this.businessDBManager.updateBusiness(data);
    }

    public async deleteBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> {
        return await this.businessDBManager.deleteBusiness(data);
    }

    public async getAllBusiness(req: GetBuisnessRequestModel): Promise<ResultModel> {
        return await this.businessDBManager.getAllBusiness(req);
    }
    public async getBusinessById(id: string): Promise<BusinessResponseModel> {
        return await this.businessDBManager.getBusinessById(id);
    }
    public async getNearByBusiness(req: GetNearByBuisnessRequestModel): Promise<ResultModel> {
        return await this.businessDBManager.getNearByBusiness(req);
    }
    public async getAndUpdateOrderSequenceNumber(businessId: string): Promise<BusinessResponseModel> {
        return await this.businessDBManager.getAndUpdateOrderSequenceNumber(businessId);
    }
    public async updateBusinessTiming(businessId: string, data: Array<BusinessTimingModel>): Promise<BusinessResponseModel> {
        return await this.businessDBManager.updateBusinessTiming(businessId, data);
    }
    public async addNewCurrencySettings(businessId: string, data: BusinessCurrencyModel): Promise<BusinessResponseModel>{
        return await this.businessDBManager.addNewCurrencySettings(businessId, data);
    }
    public async changePrimaryCurrencySettings(businessId: string, data: BusinessCurrencyModel): Promise<BusinessResponseModel>{
        return await this.businessDBManager.changePrimaryCurrencySettings(businessId, data);
    }
    public async updateBusinessDeliverySettings(businessId: string, data: BusinessDeliverySettings): Promise<BusinessResponseModel> {
        return await this.businessDBManager.updateBusinessDeliverySettings(businessId, data);
    }
    public async getAllBusinessByFuelStationId(fuelStationId: string): Promise<ResultModel> {
        return await this.businessDBManager.getAllBusinessByFuelStationId(fuelStationId);
    }
    public async updateBusinessPaymentSettings(businessId: string, data: BusinessPaymentSettings): Promise<BusinessResponseModel> {
        return await this.businessDBManager.updateBusinessPaymentSettings(businessId, data);
    }
    public async updateBusinessAvailabilityStatus(businessId: string, data: BusinessAvailabilityEnum): Promise<BusinessResponseModel>{
        return await this.businessDBManager.updateBusinessAvailabilityStatus(businessId,data)
    }
    
}