import * as mongoose from "mongoose";
import { Utility } from "../../common/utils/Utility";
import { Config } from '../../config/Config';
import { ICountryDBManager } from "../../db-layer/interfaces/ICountryDBManager";
import { DBCountrySchema } from "../../db-layer/models/ecommerce/DBCountry";
import { Country } from "../../service-layer/models/CountryModel";
import { telemetry } from '../../telemetry';
import { DBConstants } from "../models/DBConstants";

export class MongoCountryDBManager implements ICountryDBManager {
    private dBCountry: any;
    private readonly config: Config;
    constructor() {
        this.dBCountry = mongoose.model(DBConstants.CountryCollection, DBCountrySchema);
        this.config = Config.getInstance();
    }
    public async getCountryList(): Promise<Array<Country>> {
        var startTime = new Date();
     
        
        let res = await this.dBCountry.find();
        telemetry.timing("backend.mongo.getCountryList=>", startTime);
        let store = Utility.dbToCountryList(res);
        return store;
    }
}