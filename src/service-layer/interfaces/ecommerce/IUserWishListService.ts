import { UserWishListModel } from "../../../service-layer/models/ecommerce/response/UserWishListModel";

export interface IUserWishListService {
    createWishList(userId: string, productId: string): Promise<UserWishListModel>
    clearWishList(userId: string, productId: string): Promise<UserWishListModel>
    removeProductFromWishList(userId: string, productId: string): Promise<UserWishListModel>
    getWishListByUserId(userId: string): Promise<UserWishListModel>
}