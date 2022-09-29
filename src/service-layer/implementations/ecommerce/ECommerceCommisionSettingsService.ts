
import { ECommerceCommisionSettingsBaseModel } from "../../../service-layer/models/ecommerce/response/ECommerceCommisionSettingsBaseModel";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IECommerceCommisionSettingsService } from "../../../service-layer/interfaces/ecommerce/IECommerceCommisionSettingsService";

export class ECommerceCommisionSettingsService implements IECommerceCommisionSettingsService {

    private readonly commisionSettingsDBManager: IECommerceCommisionSettingsService;

    constructor() {
        this.commisionSettingsDBManager = DBManagerFactory.getCommisionSettingsDBManager();
    }

    public async getCommisionSettings(): Promise<ECommerceCommisionSettingsBaseModel> {
        return await this.commisionSettingsDBManager.getCommisionSettings();
    }
}