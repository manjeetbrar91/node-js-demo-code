import { Address } from "./Address";
import { AccountType } from './AccountInfo';
import { LoyaltyConfigurations } from './loyalty/LoyaltyConfigurations';
import { Feature } from './FeaturesList';
import { DisplayConfiguration } from "./DisplayConfiguration";
import { ServiceObject } from './ServiceObject';

export class TenantSettings {
    private enabledFeatures: Feature[];
    // disabled list has priority over enabled feature
    private disabledFeatures: Feature[];

    private loyaltyConfigurations: LoyaltyConfigurations;

    private displayConfiguration: DisplayConfiguration;

    public getDisplayConfiguration(): DisplayConfiguration {
        return this.displayConfiguration;
    }

    public setDisplayConfiguration(displayConfiguration: DisplayConfiguration): void {
        this.displayConfiguration = displayConfiguration;
    }

    public getLoyaltyConfigurations(): LoyaltyConfigurations {
        return this.loyaltyConfigurations;
    }

    public setLoyaltyConfigurations(loyaltyConfigurations: LoyaltyConfigurations): void {
        this.loyaltyConfigurations = loyaltyConfigurations;
    }

    public getDisabledFeatures(): Feature[] {
        return this.disabledFeatures;
    }

    public setDisabledFeatures(disabledFeatures: Feature[]): void {
        this.disabledFeatures = disabledFeatures;
    }

    public getEnabledFeatures(): Feature[] {
        return this.enabledFeatures;
    }

    public setEnabledFeatures(enabledFeatures: Feature[]): void {
        this.enabledFeatures = enabledFeatures;
    }

    public isFeatureEnabled(feature: Feature): boolean {
        if (feature == Feature.Unknown || this.getDisabledFeatures().includes(feature)) {
            return false;
        }

        if (!this.getEnabledFeatures().includes(feature)) {
            return false;
        }
        return true;
    } 
}

export abstract class Tenant extends ServiceObject {
    private name: string;
    private address: Address;
    private phoneNo: string;
    private photos: Array<string>;
    private settings: TenantSettings;

    public abstract getTenantType(): AccountType;

    public getSettings(): TenantSettings {
        return this.settings;
    }

    public setSettings(settings: TenantSettings): void {
        this.settings = settings;
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

    public getPhotos(): Array<string> {
        return this.photos;
    }

    public setPhotos(photos: Array<string>): void {
        this.photos = photos;
    }

}
