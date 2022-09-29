import { BusinessAvailabilityEnum } from "../../../service-layer/models/ecommerce/BusinessAvailabilityEnum";
import { BusinessCurrencyModel, BusinessDeliverySettings, BusinessPaymentSettings, BusinessResponseModel, BusinessTimingModel } from "../../../service-layer/models/ecommerce/response/BusinessResponseModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetBuisnessRequestModel";
import { GetNearByBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetNearByBuisnessRequestModel";

export interface IBusinessDBManager {
    addNewBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel>
    getAllBusiness(req: GetBuisnessRequestModel): Promise<ResultModel>
    getBusinessById(id: string): Promise<BusinessResponseModel>
    updateBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel>
    getNearByBusiness(req: GetNearByBuisnessRequestModel): Promise<ResultModel> 
    getAndUpdateOrderSequenceNumber(businessId: string): Promise<BusinessResponseModel>
    updateBusinessTiming(businessId: string, data: Array<BusinessTimingModel>): Promise<BusinessResponseModel>
    updateBusinessDeliverySettings(businessId: string, data: BusinessDeliverySettings): Promise<BusinessResponseModel>
    getAllBusinessByFuelStationId(fuelStationId: string): Promise<ResultModel> 
    addNewCurrencySettings(businessId: string, data: BusinessCurrencyModel): Promise<BusinessResponseModel>
    updateBusinessPaymentSettings(businessId: string, data: BusinessPaymentSettings): Promise<BusinessResponseModel>
    updateBusinessAvailabilityStatus(businessId: string, data: BusinessAvailabilityEnum): Promise<BusinessResponseModel>
    changePrimaryCurrencySettings(businessId: string, data: BusinessCurrencyModel): Promise<BusinessResponseModel>
    deleteBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> 
}