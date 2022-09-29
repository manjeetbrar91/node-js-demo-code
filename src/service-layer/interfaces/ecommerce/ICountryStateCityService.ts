import { Country } from "../../../service-layer/models/CountryModel";

export interface ICountryStateCityService {
    getCountryList(): Promise<Array<Country>>
}