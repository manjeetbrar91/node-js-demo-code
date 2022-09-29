import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { DBUserWishListSchema } from "../../../db-layer/models/ecommerce/DBUserWishList";
import * as mongoose from "mongoose";
import { IUserWishListDBManager } from "../../../db-layer/interfaces/ecommerce/IUserWishListDBManager";
import { UserWishListModel } from "../../../service-layer/models/ecommerce/response/UserWishListModel";
import { DBConstants } from "../../models/DBConstants";
export class MongoUserWishListDBManager implements IUserWishListDBManager {

    private wishlistDB: any;


    constructor() {
        this.wishlistDB = mongoose.model(DBConstants.UserWishListCollection, DBUserWishListSchema);

    }


    public async createWishList(userId: string, productId: string): Promise<UserWishListModel> {

        let wishList = await this.getWishListByUserId(userId)

        if (wishList != undefined && wishList != null) {
            let index = wishList.getProducts().findIndex(i => i.toString() == productId);
            if (index == -1) {
                wishList.getProducts().push(new mongoose.Types.ObjectId(productId))
                let ret = await this.wishlistDB.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, {
                    $set: {
                        products: wishList.getProducts(),
                    }
                },{new: true});
            } else {
                throw new MyError("Product is already added in wishlist")
            }
            return wishList;

        } else {
            let newModel = new UserWishListModel();
            newModel.getProducts().push(new mongoose.Types.ObjectId(productId));
            newModel.setUserId(userId);
            let db = new this.wishlistDB(newModel);
            let ret = await db.save();
            return newModel;
        }


    }
    public async clearWishList(userId: string, productId: string): Promise<UserWishListModel> {

        let wishList = await this.getWishListByUserId(userId)

        if (wishList != undefined && wishList != null) {
            let ret = await this.wishlistDB.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, {
                $set: {
                    products: [],
                }
            },{new: true});
        }
        return wishList
    }
    public async removeProductFromWishList(userId: string, productId: string): Promise<UserWishListModel> {
        let wishList = await this.getWishListByUserId(userId)

        if (wishList != undefined && wishList != null) {
            let index = wishList.getProducts().findIndex(i => i.toString() == productId);
            if (index != -1) {
                wishList.getProducts().splice(index, 1)
                let ret = await this.wishlistDB.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, {
                    $set: {
                        products: wishList.getProducts(),
                    }
                },{new: true});
            }

        }
        return wishList
    }
    public async getWishListByUserId(userId: string): Promise<UserWishListModel> {

        let ret = await this.wishlistDB.findOne({
            userId: new mongoose.Types.ObjectId(userId),
        });
        if (ret) {
            return EcommerceUtility.getUserWishListModel(ret);
        } else {
            return null
        }
    }

}