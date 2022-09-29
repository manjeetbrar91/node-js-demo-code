// import { IHostDBManager } from "../../db-layer/interfaces/IHostDBManager";
// import * as mongoose from "mongoose";
// import { telemetry } from "../../telemetry";
// import { Host } from "../../service-layer/models/Host";
// import { DBConstants } from "../../db-layer/models/DBConstants";
// import { DBHostSchema } from "../../db-layer/models/DBHost";
// import { Utility } from "../../common/utils/Utility";

// export class MongoHostDBManager implements IHostDBManager {

//   private DBHostSchema: any;

//   constructor() {
//     this.DBHostSchema = mongoose.model(DBConstants.HostsCollection, DBHostSchema);
//   }

//   public async getHostByHostName(name: string): Promise<Host> {
//     var startTime = new Date();
//     let ret = await this.DBHostSchema.findOne(
//       {
//         hostName: name
//       }
//     );
//     telemetry.timing("backend.mongo.getHostByHostName", startTime);
//     return ret ? Utility.getHost(ret) : null;
//   }

//   public async createHosts(host: Host): Promise<Host> {
//     var startTime = new Date();
//     let dbHost = new this.DBHostSchema(this.getDbHost(host));
//     let ret = await dbHost.save();

//     telemetry.timing("backend.mongo.createHosts", startTime);
//     return Utility.getHost(ret);
//   }


//   public async getHostByRestaurantId(restaurantId: string): Promise<Host>{
//     var startTime = new Date();
//     let ret = await this.DBHostSchema.findOne(
//       {
//         restaurantId:  new mongoose.Types.ObjectId(restaurantId)
//       }
//     );
//     telemetry.timing("backend.mongo.getHostByHostName", startTime);
//     return ret ? Utility.getHost(ret) : null;
//   }

//   private getDbHost(host: Host) {
//     let updateTime: Date = new Date();
//     return {
//       restaurantId: new mongoose.Types.ObjectId(host.getRestaurantId()),
//       chainId: new mongoose.Types.ObjectId(host.getChainId()),
//       hostName: host.getHostName(),
//       updatedAt: updateTime
//     }
//   }
// }