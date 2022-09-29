import { IBusinessUsersDBManager } from "../../../db-layer/interfaces/fuel/IBusinessUsersDBManager";
import { IBusinessUsersService } from "../../../service-layer/interfaces/fuel/IBusinessUsersService";
import { BusinessUserModel } from "../../../service-layer/models/fuel/BusinessUserModel";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";


export class BusinessUsersService implements IBusinessUsersService {
    private readonly discountDBManager: IBusinessUsersDBManager;

    constructor() {
        this.discountDBManager = DBManagerFactory.getBusinessUsersDBManager();
    }

    public async register(promotion: BusinessUserModel): Promise<BusinessUserModel> {
        return await this.discountDBManager.register(promotion);
    }
    public async getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel> {
        return await this.discountDBManager.getUserByMobileNumber(data);
    }
}
