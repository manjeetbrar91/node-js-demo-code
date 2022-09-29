import { ECommerceCommisionSettingsBaseModel } from "../../../service-layer/models/ecommerce/response/ECommerceCommisionSettingsBaseModel";

 
export interface IECommerceCommisionSettingsService {
    getCommisionSettings(): Promise<ECommerceCommisionSettingsBaseModel>
}