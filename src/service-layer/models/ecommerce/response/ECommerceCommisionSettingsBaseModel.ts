import { ServiceObject } from "../../../../service-layer/models/ServiceObject";

export class ECommerceCommisionSettingsBaseModel extends ServiceObject {

    private userCommisionSettings: ECommerceCommisionSettingsModel;
    private businessCommisionSettings: ECommerceCommisionSettingsModel;
    constructor() {
        super()
        this.userCommisionSettings = new ECommerceCommisionSettingsModel();
        this.businessCommisionSettings = new ECommerceCommisionSettingsModel();
    }
    public getUserCommisionSettings(): ECommerceCommisionSettingsModel {
        if (this.userCommisionSettings == undefined) {
            this.userCommisionSettings = new ECommerceCommisionSettingsModel()
        }
        return this.userCommisionSettings;
    }

    public setUserCommisionSettings(userCommisionSettings: ECommerceCommisionSettingsModel): void {
        this.userCommisionSettings = userCommisionSettings;
    }

    public getBusinessCommisionSettings(): ECommerceCommisionSettingsModel {
        if (this.businessCommisionSettings == undefined) {
            this.businessCommisionSettings = new ECommerceCommisionSettingsModel()
        }
        return this.businessCommisionSettings;
    }

    public setBusinessCommisionSettings(businessCommisionSettings: ECommerceCommisionSettingsModel): void {
        this.businessCommisionSettings = businessCommisionSettings;
    }

}
export class ECommerceCommisionSettingsModel {
    private fixedFee: number;
    private ihf: number;
    private percentage: number;
    constructor() {
        this.fixedFee = 0;
        this.ihf = 0;
        this.percentage = 0;
    }
    public getFixedFee(): number {
        return this.fixedFee;
    }

    public setFixedFee(fixedFee: number): void {
        this.fixedFee = fixedFee;
    }

    public getIhf(): number {
        return this.ihf;
    }

    public setIhf(ihf: number): void {
        this.ihf = ihf;
    }

    public getPercentage(): number {
        return this.percentage;
    }

    public setPercentage(percentage: number): void {
        this.percentage = percentage;
    }

}