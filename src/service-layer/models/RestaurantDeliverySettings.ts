import { ServiceObject } from "./ServiceObject";
import { DeliverySettingsMode } from "./DeliverySettingsMode";
import { DeliveryCharge } from "./DeliveryCharge";
import { ExtendedTypeValue } from "./extendedtypes/ExtendedType";
import { Address } from "./Address";
import { CommunitySettings } from "./CommunitySettings";
 
export class RestaurantDeliverySettings extends ServiceObject{
    private restaurantId: string;    
    private distanceThreshhold: number;
    private freeDeliveryThreshhold: number;
    private deliveryCharges: Array<DeliveryCharge>;
    private deliveryModes: Array<DeliverySettingsMode>;
    private coordinates: [number, number];
    private address: Address;
    // private enableCOD: boolean;
    private packagingCharges: RestaurantPackagingCharge;
    // private deliveryLocalities: ExtendedTypeValue[];
    private partnerType: string;
    private enableTakeAwayFutureOrders: boolean;
    private enableHomeDeliveryFutureOrders: boolean;
    private excludedDeliveryServices: Array<string>;
    private communitySettings: Array<CommunitySettings>;
    private preOrdersAllowDaysForTakeAway: number;
    private preOrdersAllowDaysForHomeDelivery: number;
    private enableFreeHomeDelivery: boolean;

    public getPartnerType(): string {
        return this.partnerType;
    }

    public setPartnerType(partnerType: string): void {
        this.partnerType = partnerType;
    }

    // public getDeliveryLocalities(): ExtendedTypeValue[] {
    //     return this.deliveryLocalities;
    // }

    // public setDeliveryLocalities(deliverylocalities: ExtendedTypeValue[]): void {
    //     this.deliveryLocalities = deliverylocalities;
    // }

    // public isEnableCOD(): boolean {
    //     return this.enableCOD;
    // }

    // public setEnableCOD(enableCOD: boolean): void {
    //     this.enableCOD = enableCOD;
    // }     
    public isEnableTakeAwayFutureOrders(): boolean {
        return this.enableTakeAwayFutureOrders;
    }

    public setEnableTakeAwayFutureOrders(enableTakeAwayFutureOrders: boolean): void {
        this.enableTakeAwayFutureOrders = enableTakeAwayFutureOrders;
    }

    public isEnableHomeDeliveryFutureOrders(): boolean {
        return this.enableHomeDeliveryFutureOrders;
    }

    public setEnableHomeDeliveryFutureOrders(enableHomeDeliveryFutureOrders: boolean): void {
        this.enableHomeDeliveryFutureOrders = enableHomeDeliveryFutureOrders;
    }

    public getPackagingCharges(): RestaurantPackagingCharge {
        return this.packagingCharges;
    }

    public setPackagingCharges(packagingCharges: RestaurantPackagingCharge): void {
        this.packagingCharges = packagingCharges;
    }
 
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    
    public setRestaurantId(value: string) {
        this.restaurantId = value;
    }
 
    public getAddress(): Address {
        return this.address;
    }
 
    public setAddress(value: Address) {
        this.address = value;
    }
 
    public getCoordinates(): [number, number] {
        return this.coordinates;
    }
 
    public setCoordinates(value: [number, number]) {
        this.coordinates = value;
    }
 
    public getDeliveryModes(): Array<DeliverySettingsMode> {
        return this.deliveryModes;
    }
 
    public setDeliveryModes(value: Array<DeliverySettingsMode>) {
        this.deliveryModes = value;
    }
 
    public getDeliveryCharges(): Array<DeliveryCharge> {
        return this.deliveryCharges;
    }
 
    public setDeliveryCharges(value: Array<DeliveryCharge>) {
        this.deliveryCharges = value;
    }
 
    public getFreeDeliveryThreshhold(): number {
        return this.freeDeliveryThreshhold;
    }
 
    public setFreeDeliveryThreshhold(value: number) {
        this.freeDeliveryThreshhold = value;
    }    
    
    public getDistanceThreshhold(): number {
        return this.distanceThreshhold;
    }
 
    public setDistanceThreshhold(value: number) {
        this.distanceThreshhold = value;
    }

    public getExcludedDeliveryServices(): Array<string> {
        return this.excludedDeliveryServices;
    }

    public setExcludedDeliveryServices(excludedDeliveryServices: Array<string>) {
        this.excludedDeliveryServices = excludedDeliveryServices;
    }

    public getCommunitySettings(): Array<CommunitySettings> {
        return this.communitySettings;
    }

    public setCommunitySettings(communitySettings: Array<CommunitySettings>) {
        this.communitySettings = communitySettings;
    }

    public getPreOrdersAllowDaysForTakeAway(): number {
        return this.preOrdersAllowDaysForTakeAway;
    }

    public setPreOrdersAllowDaysForTakeAway(allowDays: number): void {
        this.preOrdersAllowDaysForTakeAway = allowDays;
    }

    public getPreOrdersAllowDaysForHomeDelivery(): number {
        return this.preOrdersAllowDaysForHomeDelivery;
    }

    public setPreOrdersAllowDaysForHomeDelivery(allowDays: number): void {
        this.preOrdersAllowDaysForHomeDelivery = allowDays;
    }

    public isEnableFreeHomeDelivery(): boolean {
        return this.enableFreeHomeDelivery;
    }

    public setEnableFreeHomeDelivery(enableFreeHomeDelivery: boolean): void {
        this.enableFreeHomeDelivery = enableFreeHomeDelivery;
    }
}

export class RestaurantPackagingCharge {
    private enabled: boolean;
    private perOrder : PackagingCharge;
    private perItem : PackagingCharge;

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    public getPerOrder(): PackagingCharge {
        return this.perOrder;
    }

    public setPerOrder(perOrder: PackagingCharge): void {
        this.perOrder = perOrder;
    }

    public getPerItem(): PackagingCharge {
        return this.perItem;
    }

    public setPerItem(perItem: PackagingCharge): void {
        this.perItem = perItem;
    }
}

export class PackagingCharge {
    private enabled: boolean;
    private charge : number;

    constructor(enabled: boolean, charge: number) {
        this.enabled = enabled;
        this.charge = charge;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    public getCharge(): number {
        return this.charge;
    }

    public setCharge(charge: number): void {
        this.charge = charge;
    }
}