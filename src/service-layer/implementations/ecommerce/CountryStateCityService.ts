import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IUserWishListDBManager } from "../../../db-layer/interfaces/ecommerce/IUserWishListDBManager";
import { ICountryDBManager } from "../../../db-layer/interfaces/ICountryDBManager";
import { ICountryStateCityService } from "../../../service-layer/interfaces/ecommerce/ICountryStateCityService";
import { Country } from "../../../service-layer/models/CountryModel";

export class CountryStateCityService implements ICountryStateCityService {
    private readonly countryDB: ICountryDBManager;

    constructor() {
        this.countryDB = DBManagerFactory.getCountryDBManager();
    }

    public async  getCountryList(): Promise<Array<Country>>{
        return await this.countryDB.getCountryList();
    }
}