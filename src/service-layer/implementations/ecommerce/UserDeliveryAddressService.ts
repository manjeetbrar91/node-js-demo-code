import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IUserDeliveryAddressDBManager } from "../../../db-layer/interfaces/ecommerce/IUserDeliveryAddressDBManager";
import { IUserDeliveryAddressService } from "../../../service-layer/interfaces/ecommerce/IUserDeliveryAddressService";
import { UserDeliveryAddressModel } from "../../models/ecommerce/response/UserDeliveryAddressModel";

export class UserDeliveryAddressService implements IUserDeliveryAddressService {
    private readonly dbManager: IUserDeliveryAddressDBManager;

    constructor() {
        this.dbManager = DBManagerFactory.getUserDeliveryAddressDBManager();
    }
     
    public async updateDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel> {
        return this.dbManager.updateDeliveryAddress(data);
    }
    public async addNewDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel> {
        return this.dbManager.addNewDeliveryAddress(data);
    }
    public async makePrimaryAddress(addressId: string,userId:string): Promise<UserDeliveryAddressModel>{
        return this.dbManager.makePrimaryAddress(addressId,userId);
    }
    public async deleteUserDeliveryAddress(userId: string, id: string): Promise<UserDeliveryAddressModel> {
        return await this.dbManager.deleteUserDeliveryAddress(userId, id)

    }
    public async getAllDeliveryAddressOfUser(userId: string): Promise<Array<UserDeliveryAddressModel>> {
        return await this.dbManager.getAllDeliveryAddressOfUser(userId)
    }
    public async getUserDeliveryAddressById(id: string): Promise<UserDeliveryAddressModel> {
        return await this.dbManager.getUserDeliveryAddressById(id);
    }
}