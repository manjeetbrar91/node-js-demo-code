import * as mongoose from "mongoose";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { INotificationDBManager } from "../../../db-layer/interfaces/ecommerce/INotificationDBManager";
import { DBNotificationsSchema } from "../../../db-layer/models/ecommerce/DBNotifications";
import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";
import { DBDevicesSchema } from "../../../db-layer/models/ecommerce/DBDevices";
import { DBConstants } from "../../models/DBConstants";
export class MongoNotificationDBManager implements INotificationDBManager {
    private notificationDB: any;
    private deviceDB: any;

    constructor() {
        this.notificationDB = mongoose.model(DBConstants.NotificationsCollection, DBNotificationsSchema);
        this.deviceDB = mongoose.model(DBConstants.DevicesNotificationsCollection, DBDevicesSchema);
    }

    public async addNewNotification(data: PushNotificationBaseModel): Promise<PushNotificationBaseModel> {
        try {

            let db = new this.notificationDB(data);
            let ret = await db.save();

            return EcommerceUtility.getPushNotificationBaseModel(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async deleteOrderNotification(userId:string,orderId:string): Promise<boolean> {
        try {

            await this.notificationDB.deleteMany({
                "extra.orderId": new mongoose.Types.ObjectId(orderId),
                receiver: userId,
            });
            return true
        } catch (err) {
            
            throw new MyError(err.message, err.stack);
        }
    }
    public async getDevices(userId: string): Promise<[]> {
        try {


            let ret = await this.deviceDB.find({
                $or: [
                    { userId: userId },
                    { userId1: userId },
                    { userId2: userId }
                ]
            });
            if (ret && ret[0]) {
                return ret;
            } else {
                return []
            }            
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

}