import { ServiceObject } from "./ServiceObject";

export class Country extends ServiceObject {
    private name: string;
    private iso3: string;
    private iso2: string;
    private phone_code: string;
    private capital: string;
    private currency: string;
    private currency_symbol: string;
    private native: string;
    private region: string;
    private subregion: string;
    private countryName: string;

    public getCountryName(): string {
        return this.countryName;
    }

    public setCountryName(countryName: string): void {
        this.countryName = countryName;
    }


    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getIso3(): string {
        return this.iso3;
    }

    public setIso3(iso3: string): void {
        this.iso3 = iso3;
    }

    public getIso2(): string {
        return this.iso2;
    }

    public setIso2(iso2: string): void {
        this.iso2 = iso2;
    }

    public getPhone_code(): string {
        return this.phone_code;
    }

    public setPhone_code(phone_code: string): void {
        this.phone_code = phone_code;
    }

    public getCapital(): string {
        return this.capital;
    }

    public setCapital(capital: string): void {
        this.capital = capital;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getCurrency_symbol(): string {
        return this.currency_symbol;
    }

    public setCurrency_symbol(currency_symbol: string): void {
        this.currency_symbol = currency_symbol;
    }

    public getNative(): string {
        return this.native;
    }

    public setNative(native: string): void {
        this.native = native;
    }

    public getRegion(): string {
        return this.region;
    }

    public setRegion(region: string): void {
        this.region = region;
    }

    public getSubregion(): string {
        return this.subregion;
    }

    public setSubregion(subregion: string): void {
        this.subregion = subregion;
    }


}