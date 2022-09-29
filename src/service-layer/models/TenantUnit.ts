import { Tenant } from "./Tenant"
import { Address } from "./Address";
import { ServiceObject } from './ServiceObject';

export class TenantUnit<V, T extends Tenant> extends ServiceObject {
    private tenant: T;
    private preferences: V;
    private GSTNumber: string;
    private displayName: string;
    private fassaiNumber: string;
    private mobileNumber2: string;
    private emailAddress1: string;
    private emailAddress2: string;
    private landlineNumber1: string;
    private landlineNumber2: string;
    private name: string;
    private address: Address;
    private phoneNo: string;
    private coordinates: [number, number];

    public getCoordinates(): [number, number] {
        return this.coordinates;
    }

    public setCoordinates(coordinates: [number, number]): void {
        this.coordinates = coordinates;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getAddress(): Address {
        return this.address;
    }

    public setAddress(address: Address): void {
        this.address = address;
    }

    public getPhoneNo(): string {
        return this.phoneNo;
    }

    public setPhoneNo(phoneNo: string): void {
        this.phoneNo = phoneNo;
    }

    public getDisplayName(): string {
        return this.displayName;
    }

    public setDisplayName(displayName: string): void {
        this.displayName = displayName;
    }

    public getFASSAINumber(): string {
        return this.fassaiNumber;
    }

    public setFASSAINumber(FASSAINumber: string): void {
        this.fassaiNumber = FASSAINumber;
    }

    public getMobileNumber2(): string {
        return this.mobileNumber2;
    }

    public setMobileNumber2(mobileNumber2: string): void {
        this.mobileNumber2 = mobileNumber2;
    }

    public getEmailAddress1(): string {
        return this.emailAddress1;
    }

    public setEmailAddress1(emailAddress1: string): void {
        this.emailAddress1 = emailAddress1;
    }

    public getEmailAddress2(): string {
        return this.emailAddress2;
    }

    public setEmailAddress2(emailAddress2: string): void {
        this.emailAddress2 = emailAddress2;
    }

    public getLandlineNumber1(): string {
        return this.landlineNumber1;
    }

    public setLandlineNumber1(landlineNumber1: string): void {
        this.landlineNumber1 = landlineNumber1;
    }

    public getLandlineNumber2(): string {
        return this.landlineNumber2;
    }

    public setLandlineNumber2(landlineNumber2: string): void {
        this.landlineNumber2 = landlineNumber2;
    }

    public getGSTNumber(): string {
        return this.GSTNumber;
    }

    public setGSTNumber(GSTNumber: string): void {
        this.GSTNumber = GSTNumber;
    }

    public getTenant(): T {
        return this.tenant;
    }

    public setTenant(tenant: T): void {
        this.tenant = tenant;
    }

    public getPreferences(): V {
        return this.preferences;
    }

    public setPreferences(preferences: V): void {
        this.preferences = preferences;
    }
}