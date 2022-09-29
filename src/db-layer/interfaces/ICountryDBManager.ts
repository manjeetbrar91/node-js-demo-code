import { Country } from "../../service-layer/models/CountryModel";

export interface ICountryDBManager {
    getCountryList(): Promise<Array<Country>>
}