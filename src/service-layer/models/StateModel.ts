import { ServiceObject } from "./ServiceObject";
export class City extends ServiceObject {
    private name: string;
    private latitude: number;
    private longitude: number;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }


}
export class States extends ServiceObject {
    private name: string;
    private state_code: string;
    private country: string;
    private cities: Array<City>;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getState_code(): string {
        return this.state_code;
    }

    public setState_code(state_code: string): void {
        this.state_code = state_code;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getCities(): Array<City> {
        return this.cities;
    }

    public setCities(cities: Array<City>): void {
        this.cities = cities;
    }


}