import { ServiceObject } from './ServiceObject';
import { MenewCommisionSetting } from './MenewCommisionSetting';
import { ChannelType } from './RestaurantCustomerOrder';

export class RestaurantChannelCommisionSetting extends ServiceObject {
    private restaurantId: string;
    private paymentAccountId: string;
    private currency: string;
    private channelType: ChannelType;
    private commisionSetting: MenewCommisionSetting;

    public getPaymentAccountId(): string {
        return this.paymentAccountId;
    }

    public setPaymentAccountId(paymentAccountId: string): void {
        this.paymentAccountId = paymentAccountId;
    }
    
    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getChannelType(): ChannelType {
        return this.channelType;
    }

    public setChannelType(channelType: ChannelType): void {
        this.channelType = channelType;
    }

    public getCommisionSetting(): MenewCommisionSetting {
        return this.commisionSetting;
    }

    public setCommisionSetting(commisionSetting: MenewCommisionSetting): void {
        this.commisionSetting = commisionSetting;
    }
}