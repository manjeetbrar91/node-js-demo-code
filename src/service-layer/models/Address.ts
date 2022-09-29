export class Address {

    private addressLine1: string;
    private addressLine2: string;
    private locality: string;
    private city: string;
    private state: string;
    private country: string;
    private pinCode: number;
    private formatAddress: string;

    public getLocality(): string {
        return this.locality;
    }

    public setLocality(locality: string): void {
        this.locality = locality;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getState(): string {
        return this.state;
    }

    public setFormatAddress(address: string): void {
        this.formatAddress = address;
    }

    public getFormatAddress(): string {
        return this.formatAddress;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
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

    public getPinCode(): number {
        return this.pinCode;
    }

    public setPinCode(pinCode: number): void {
        this.pinCode = pinCode;
    }



}