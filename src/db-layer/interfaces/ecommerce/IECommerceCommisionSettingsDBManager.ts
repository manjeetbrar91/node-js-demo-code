import { ECommerceCommisionSettingsBaseModel } from "../../../service-layer/models/ecommerce/response/ECommerceCommisionSettingsBaseModel";

 

export interface IECommerceCommisionSettingsDBManager {
    // addAuditLog(log: OrderAuditLog): Promise<OrderAuditLog>;
    getCommisionSettings(): Promise<ECommerceCommisionSettingsBaseModel>
}