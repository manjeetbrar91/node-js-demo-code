import { RestaurantSMSSettings } from "../../service-layer/models/RestaurantSMSSettings";
import { RestaurantSMSLog } from "../../service-layer/models/RestaurantSMSLog";
import { ReportsBaseRequest } from "../../web-layer/models/request/ReportsBaseRequest";

export interface IRestaurantSMSDBManager {
    createOrUpdateSetting(setting: RestaurantSMSSettings): Promise<RestaurantSMSSettings>;
    getSMSSetting(restaurantId: string): Promise<RestaurantSMSSettings>;

    addSMSLog(log: RestaurantSMSLog): Promise<RestaurantSMSLog>;
    getSMSLogs(request: ReportsBaseRequest): Promise<Array<RestaurantSMSLog>>;
    getSMSLogsByTxId(txId: string): Promise<RestaurantSMSLog>;
    createOrUpdateSMSLog(log: RestaurantSMSLog): Promise<boolean>;
}