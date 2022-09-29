import { ServiceObject } from "../../ServiceObject";

export class UserDeliveryAddressModel extends ServiceObject {
    private userId: string;
    private firstName: string;
    private lastName: string;
    private addressType: string;

    private countryCode: number;
    private phoneNumber: string;

    private addressLine1: string;
    private addressLine2: string;
    private locality: string;
    private state: string;
    private city: string;
    private country: string;
    private countryAbbreviation: string;
    private zipCode: string;

    private latitude: number;
    private longitude: number;
    private primaryAddress: boolean;

    public isPrimaryAddress(): boolean {
        return this.primaryAddress;
    }

    public setPrimaryAddress(primaryAddress: boolean): void {
        this.primaryAddress = primaryAddress;
    }




    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getAddressType(): string {
        return this.addressType;
    }

    public setAddressType(addressType: string): void {
        this.addressType = addressType;
    }

    public getCountryCode(): number {
        return this.countryCode;
    }

    public setCountryCode(countryCode: number): void {
        this.countryCode = countryCode;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getAddressLine1(): string {
        return this.addressLine1;
    }

    public setAddressLine1(addressLine1: string): void {
        this.addressLine1 = addressLine1;
    }

    public getAddressLine2(): string {
        return this.addressLine2;
    }

    public setAddressLine2(addressLine2: string): void {
        this.addressLine2 = addressLine2;
    }

    public getLocality(): string {
        return this.locality;
    }

    public setLocality(locality: string): void {
        this.locality = locality;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getCountryAbbreviation(): string {
        return this.countryAbbreviation;
    }

    public setCountryAbbreviation(countryAbbreviation: string): void {
        this.countryAbbreviation = countryAbbreviation;
    }

    public getZipCode(): string {
        return this.zipCode;
    }

    public setZipCode(zipCode: string): void {
        this.zipCode = zipCode;
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