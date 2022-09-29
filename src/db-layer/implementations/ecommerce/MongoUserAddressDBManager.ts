import { IUserDeliveryAddressDBManager } from "../../interfaces/ecommerce/IUserDeliveryAddressDBManager";
import { DBUserDeliveryAddressSchema } from "../../../db-layer/models/ecommerce/DBUserDeliveryAddress";
import * as mongoose from "mongoose";
import { UserDeliveryAddressModel } from "../../../service-layer/models/ecommerce/response/UserDeliveryAddressModel";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { telemetry } from "../../../telemetry";
import { DBConstants } from "../../models/DBConstants";
export class MongoUserDeliveryAddressDBManager implements IUserDeliveryAddressDBManager {
    private userDeliveryAddressDB: any;

    constructor() {
        this.userDeliveryAddressDB = mongoose.model(DBConstants.UserDeliveryAddressCollection, DBUserDeliveryAddressSchema);
    }

    public async addNewDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel> {
        try {
            let startTime = new Date();
            let db = new this.userDeliveryAddressDB(data);
            let ret = await db.save();
            telemetry.timing("backend.mongo.addNewDeliveryAddress", startTime);
            return EcommerceUtility.getUserDeliveryAddressData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async makePrimaryAddress(addressId: string,userId:string): Promise<UserDeliveryAddressModel> {
        try {
            let startTime = new Date();


            const ret = await this.userDeliveryAddressDB.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(addressId),
                userId: new mongoose.Types.ObjectId(userId),
            }, {
                $set: { primaryAddress: true }
            }, { upsert: true, new: true });
            const ret1 = await this.userDeliveryAddressDB.updateMany({
                _id: { $ne: new mongoose.Types.ObjectId(addressId) },
                userId: new mongoose.Types.ObjectId(userId),
            }, {
                $set: { primaryAddress: false }
            }, { upsert: true, new: true });
            telemetry.timing("backend.mongo.makePrimaryAddress", startTime);
            return EcommerceUtility.getUserDeliveryAddressData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async updateDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel> {
        try {
            let startTime = new Date();
            let id = data.getId().toString();
            let userId = data.getUserId().toString();
            let db = new this.userDeliveryAddressDB(data);
            // delete db.id
            // delete db._id
            // delete db.userId
            db._id = new mongoose.Types.ObjectId(id);
            const ret = await this.userDeliveryAddressDB.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(id),
                userId: new mongoose.Types.ObjectId(userId),
            }, { $set: db }, { upsert: true, new: true });
            telemetry.timing("backend.mongo.updateDeliveryAddress", startTime);
            return EcommerceUtility.getUserDeliveryAddressData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async deleteUserDeliveryAddress(userId: string, id: string): Promise<UserDeliveryAddressModel> {
        try {
            let startTime = new Date();
            const ret = await this.userDeliveryAddressDB.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(id),
                userId: new mongoose.Types.ObjectId(userId),
            },
                {
                    $set: {
                        status: DBConstants.deletedStatus,
                    }
                },{new: true});
            telemetry.timing("backend.mongo.deleteUserDeliveryAddress", startTime);

            return EcommerceUtility.getUserDeliveryAddressData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }


    public async getAllDeliveryAddressOfUser(userId: string): Promise<Array<UserDeliveryAddressModel>> {
        try {




            let startTime = new Date();
            let items = await this.userDeliveryAddressDB.find({
                userId: new mongoose.Types.ObjectId(userId),
                status: DBConstants.activeStatus
            })

            telemetry.timing("backend.mongo.getAllDeliveryAddressOfUser", startTime);

            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getUserDeliveryAddressData)
            }

            return data;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getUserDeliveryAddressById(id: string): Promise<UserDeliveryAddressModel> {
        try {



            let startTime = new Date();
            let items = await this.userDeliveryAddressDB.find({
                _id: new mongoose.Types.ObjectId(id),
            })

            telemetry.timing("backend.mongo.getUserDeliveryAddressById", startTime);


            if (items && items[0]) {
                return EcommerceUtility.getUserDeliveryAddressData(items[0]);
            } else {
                throw new MyError("Address not found");
            }


        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }


}