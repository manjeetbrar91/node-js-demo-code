import { ChannelType } from "./RestaurantCustomerOrder";

export class InternetHandlingChargeSetting {
    private channel: ChannelType;
    private enabled: boolean;
    private percentageValue: number;
    private IHFCommissionPartnerShips: Array<IHFCommissionPartnerShip>;

    public getIHFCommissionPartnerShips(): Array<IHFCommissionPartnerShip> {
        return this.IHFCommissionPartnerShips;
    }

    public setIHFCommissionPartnerShips(IHFCommissionPartnerShips: Array<IHFCommissionPartnerShip>): void {
        this.IHFCommissionPartnerShips = IHFCommissionPartnerShips;
    }

    public getChannel(): ChannelType {
        return this.channel;
    }

    public setChannel(channel: ChannelType): void {
        this.channel = channel;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    public getPercentageValue(): number {
        return this.percentageValue;
    }

    public setPercentageValue(percentageValue: number): void {
        this.percentageValue = percentageValue;
    }
}

export class IHFCommissionPartnerShip {
    private name: string;
    private value: number;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }
}

export enum IHFPartnerType {
    Menew ="xxxxxxx",
    Owner = "owner",
    Vendor = "vendor"
}