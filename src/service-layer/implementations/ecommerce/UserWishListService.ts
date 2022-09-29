import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IUserWishListDBManager } from "../../../db-layer/interfaces/ecommerce/IUserWishListDBManager";
import { UserWishListModel } from "../../../service-layer/models/ecommerce/response/UserWishListModel";
import { IUserWishListService } from "../../interfaces/ecommerce/IUserWishListService";

export class UserWishListService implements IUserWishListService {
    private readonly productsDBManager: IUserWishListDBManager;

    constructor() {
        this.productsDBManager = DBManagerFactory.getUserWishListDBManager();
    }

    public async createWishList(userId: string, productId: string): Promise<UserWishListModel> {
        return await this.productsDBManager.createWishList(userId, productId);
    }


    public async clearWishList(userId: string, productId: string): Promise<UserWishListModel> {
        return await this.productsDBManager.clearWishList(userId, productId);
    }
    public async removeProductFromWishList(userId: string, productId: string): Promise<UserWishListModel> {
        return await this.productsDBManager.removeProductFromWishList(userId, productId);
    }
    public async getWishListByUserId(userId: string): Promise<UserWishListModel> {
        return await this.productsDBManager.getWishListByUserId(userId);
    }
}