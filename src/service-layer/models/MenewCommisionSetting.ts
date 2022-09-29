import { ServiceObject } from './ServiceObject';

export class MenewCommisionSetting extends ServiceObject {
    private name: string;
    private description: string;
    private commisionSettings: Array<CommisionSetting>;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getCommisionSettings(): Array<CommisionSetting> {
        return this.commisionSettings;
    }

    public setCommisionSettings(commisionSettings: Array<CommisionSetting>): void {
        this.commisionSettings = commisionSettings;
    }
}

export class CommisionSetting {
    private paymentMethod: string;
    private minAmount: number;
    private maxAmount: number;
    private international: boolean;
    private commisionPercentage: number;

    public getPaymentMethod(): string {
        return this.paymentMethod;
    }

    public setPaymentMethod(paymentMethod: string): void {
        this.paymentMethod = paymentMethod;
    }

    public getMinAmount(): number {
        return this.minAmount;
    }

    public setMinAmount(minAmount: number): void {
        this.minAmount = minAmount;
    }

    public getMaxAmount(): number {
        return this.maxAmount;
    }

    public setMaxAmount(maxAmount: number): void {
        this.maxAmount = maxAmount;
    }

    public isInternational(): boolean {
        return this.international;
    }

    public setInternational(international: boolean): void {
        this.international = international;
    }

    public getCommisionPercentage(): number {
        return this.commisionPercentage;
    }

    public setCommisionPercentage(commisionPercentage: number): void {
        this.commisionPercentage = commisionPercentage;
    }
}