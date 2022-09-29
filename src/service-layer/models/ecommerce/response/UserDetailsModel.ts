import { ServiceObject } from "../../../../service-layer/models/ServiceObject"

export class UserDetailsModel extends ServiceObject {
    private mobileNumber: string;
    private countryCode: string;
    private mobileVerified: boolean
    private email: string;
    private firstName: string;
    private lastName: string;
    private image: string;

    public getMobileNumber(): string {
        return this.mobileNumber;
    }

    public setMobileNumber(mobileNumber: string): void {
        this.mobileNumber = mobileNumber;
    }

    public getCountryCode(): string {
        return this.countryCode;
    }

    public setCountryCode(countryCode: string): void {
        this.countryCode = countryCode;
    }

    public isMobileVerified(): boolean {
        return this.mobileVerified;
    }

    public setMobileVerified(mobileVerified: boolean): void {
        this.mobileVerified = mobileVerified;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
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

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

}