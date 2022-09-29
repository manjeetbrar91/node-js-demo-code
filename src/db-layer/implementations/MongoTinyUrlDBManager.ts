import * as mongoose from "mongoose";
import { Config } from '../../config/Config';
import { ITinyUrlDBManager } from "../../db-layer/interfaces/ITinyUrlDBManager";
import { DBTinyURLSchema } from "../../db-layer/models/DBTinyURL";
import { telemetry } from '../../telemetry';
import { DBConstants } from "../models/DBConstants";

export class MongoTinyUrlDBManager implements ITinyUrlDBManager {
    private DBTinyURL: any;
    private readonly config: Config;
    constructor() {
        this.DBTinyURL = mongoose.model(DBConstants.TinyURLCollection, DBTinyURLSchema);
        this.config = Config.getInstance();
    }

    private async generateCode(): Promise<string> {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        let result = [];
        for (var i = 0; i < 8; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }
    public async saveTinyURL(url: string): Promise<string> {

        var startTime = new Date();
        let code = await this.generateCode();
        let dbStore = new this.DBTinyURL({
            code: code,
            url: url,
        });


        let ret = await dbStore.save();
        telemetry.timing("backend.mongo.saveTinyURL", startTime);
        let smsURL = `${this.config.getTinyUrl()}/${code}`;
        return smsURL;
    }
    public async getTinyURL(uniqueCode: string): Promise<string> {

        var startTime = new Date();
        let code = await this.generateCode();
        let qry = [{
            $sort: {
                createdAt: -1
            }
        }, {
            $match: {
                code: uniqueCode
            }
        }, {
            $limit: 1
        }];
        let res = await this.DBTinyURL.aggregate(qry);
        telemetry.timing("backend.mongo.saveTinyURL", startTime);
        if (res && res[0]) {
            return res[0].url;
        } else {
            throw new Error("Invalid Code");
        }
    }


}