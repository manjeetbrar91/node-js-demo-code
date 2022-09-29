import { RestaurantChain } from "./RestaurantChain"
import { RestaurantPreferences } from "./RestaurantPreferences"
import { TenantUnit } from "./TenantUnit"
import { RestaurantSettings } from "./RestaurantSettings";
import { AvailabilitySchedule } from './AvailabilitySchedule';
import { GeneralSettings } from "./GeneralSettings";
import { SocialLinks } from "./SocialLinks";
import { KitchenDisplaySystem } from "./KitchenDisplaySystemSetting";
import { ChannelType } from "./RestaurantCustomerOrder";
import { InternetHandlingChargeSetting, IHFCommissionPartnerShip } from "./InternetHandlingChargeSetting";
import { RestaurantScreenSchedule } from "./RestaurantSchedule";
import { InventorySettings } from "./InventorySettings";
import { ReportSettings } from "./ReportSettings";

export class GoogleAccountInfo {
    private accessToken: string;
    private refreshToken: string;
    private accountLinkedTime: Date;

    public getAccountLinkedTime(): Date {
        return this.accountLinkedTime;
    }

    public setAccountLinkedTime(accountLinkedTime: Date): void {
        this.accountLinkedTime = accountLinkedTime;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }
}
export class UrbanPiperInfo {
    private apiKey: string;
    private userName: string;

    public getApiKey(): string {
        return this.apiKey;
    }

    public setApiKey(apiKey: string): void {
        this.apiKey = apiKey;
    }

    public getUserName(): string {
        return this.userName;
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }
}
export class RestaurantSessionSettings extends AvailabilitySchedule {
    private sessionName: string;

    public getSessionName(): string {
        return this.sessionName;
    }

    public setSessionName(sessionName: string): void {
        this.sessionName = sessionName;
    }



}
export class RestaurantTokenSettings {
    private channelType: ChannelType;
    private enabled: boolean;
    private tokenSequenceNumber: number;

    public getTokenSequenceNumber(): number {
        return this.tokenSequenceNumber;
    }

    public setTokenSequenceNumber(tokenSequenceNumber: number): void {
        this.tokenSequenceNumber = tokenSequenceNumber;
    }


    public getChannelType(): ChannelType {
        return this.channelType;
    }

    public setChannelType(channelType: ChannelType): void {
        this.channelType = channelType;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }
 




}
export class Restaurant extends TenantUnit<RestaurantPreferences, RestaurantChain> {
    private schedule: AvailabilitySchedule;
    private averageCostForTwo: number;
    private cuisines: Array<string>;
    private photos: Array<string>;
    private orderSequenceNumber: number;
    private restaurantType: string;
    private orderPlacedBy: string;
    // @Sachin can be part of print settings inside settings? 
    private numberOfPrintCopies: number;
    // @Sachin can be part of print settings inside settings?  
    private autoPrint: boolean;
    private googleAccountInfo: GoogleAccountInfo;
    private settings: RestaurantSettings;
    private urbanPiperInfo: UrbanPiperInfo;
    private otpExpiresAt: number;
    private razorPayDisabled: boolean;
    private generalSettings: GeneralSettings;
    private socialLinks: SocialLinks;
    private kitchenDisplaySystem: KitchenDisplaySystem;
    private branchName: string;
    private packingChargeGstRate: number;
    private deliveryChargeGstRate: number;
    private enableSendSMSPlaceOrder: boolean;
    private hideTableReservation: boolean;
    private channelPaymentModes: Array<ChannelPaymentModes>;
    private internetHandlingChargesSettings: Array<InternetHandlingChargeSetting>;
    private IHFCommissionPartnerShips: Array<IHFCommissionPartnerShip>;
    private screenSchedule: RestaurantScreenSchedule[];
    private sectionSchedule: Array<string>;
    private hasEzeepPrinters: boolean;
    private printService: string;
    private printNodeIds: Array<string>;
    private purchaseOrderSequenceNumber: number;
    private inventorySettings: InventorySettings;
    private transferSequenceNumber: number;
    private sessionSettings: Array<RestaurantSessionSettings>;
    private orderSequenceNumberPrefix: string;
    private tokenNumberSettings: Array<RestaurantTokenSettings>;
    private reportSettings: ReportSettings;
    private tableSectionChargesGSTRate: number;

    public getTableSectionChargesGSTRate(): number {
        return this.tableSectionChargesGSTRate;
    }

    public setTableSectionChargesGSTRate(tableSectionChargesGSTRate: number): void {
        this.tableSectionChargesGSTRate = tableSectionChargesGSTRate;
    }


    
    
    public getReportSettings(): ReportSettings {
        return this.reportSettings;
    }
    
    public setReportSettings(reportSettings: ReportSettings): void {
        this.reportSettings = reportSettings;
    }

    
    public getTokenNumberSettings(): Array<RestaurantTokenSettings> {
        return this.tokenNumberSettings;
    }

    public setTokenNumberSettings(tokenNumberSettings: Array<RestaurantTokenSettings>): void {
        this.tokenNumberSettings = tokenNumberSettings;
    }

    public getOrderSequenceNumberPrefix(): string {
        return this.orderSequenceNumberPrefix;
    }

    public setOrderSequenceNumberPrefix(orderSequenceNumberPrefix: string): void {
        this.orderSequenceNumberPrefix = orderSequenceNumberPrefix;
    }




    public getSessionSettings(): Array<RestaurantSessionSettings> {
        return this.sessionSettings ? this.sessionSettings : [];
    }

    public setSessionSettings(sessionSettings: Array<RestaurantSessionSettings>): void {
        this.sessionSettings = sessionSettings;
    }


    public getTransferSequenceNumber(): number {
        return this.transferSequenceNumber;
    }

    public setTransferSequenceNumber(transferSequenceNumber: number): void {
        this.transferSequenceNumber = transferSequenceNumber;
    }


    public getInventorySettings(): InventorySettings {
        return this.inventorySettings;
    }

    public setInventorySettings(inventorySettings: InventorySettings): void {
        this.inventorySettings = inventorySettings;
    }


    public getPurchaseOrderSequenceNumber(): number {
        return this.purchaseOrderSequenceNumber;
    }

    public setPurchaseOrderSequenceNumber(purchaseOrderSequenceNumber: number): void {
        this.purchaseOrderSequenceNumber = purchaseOrderSequenceNumber;
    }
    public getPrintNodeIds(): Array<string> {
        return this.printNodeIds;
    }

    public setPrintNodeIds(printNodeIds: Array<string>): void {
        this.printNodeIds = printNodeIds;
    }

    public getPrintService(): string {
        return this.printService;
    }

    public setPrintService(printService: string): void {
        this.printService = printService;
    }
    public isHasEzeepPrinters(): boolean {
        return this.hasEzeepPrinters;
    }

    public setHasEzeepPrinters(hasEzeepPrinters: boolean): void {
        this.hasEzeepPrinters = hasEzeepPrinters;
    }

    public getSectionSchedule(): Array<string> {
        return this.sectionSchedule;
    }

    public setSectionSchedule(sectionSchedule: Array<string>): void {
        this.sectionSchedule = sectionSchedule;
    }

    public getIHFCommissionPartnerShips(): Array<IHFCommissionPartnerShip> {
        return this.IHFCommissionPartnerShips;
    }

    public setIHFCommissionPartnerShips(IHFCommissionPartnerShips: Array<IHFCommissionPartnerShip>): void {
        this.IHFCommissionPartnerShips = IHFCommissionPartnerShips;
    }

    public getScreenSchedule(): RestaurantScreenSchedule[] {
        return this.screenSchedule;
    }

    public setScreenSchedule(screenSchedule: RestaurantScreenSchedule[]): void {
        this.screenSchedule = screenSchedule;
    }

    public getInternetHandlingChargesSettings(): Array<InternetHandlingChargeSetting> {
        return this.internetHandlingChargesSettings;
    }

    public setInternetHandlingChargesSettings(internetHandlingChargesSettings: Array<InternetHandlingChargeSetting>): void {
        this.internetHandlingChargesSettings = internetHandlingChargesSettings;
    }

    public getChannelPaymentModes(): Array<ChannelPaymentModes> {
        return this.channelPaymentModes;
    }

    public setChannelPaymentModes(channelPaymentModes: Array<ChannelPaymentModes>): void {
        this.channelPaymentModes = channelPaymentModes;
    }

    public getHideTableReservation(): boolean {
        return this.hideTableReservation;
    }

    public setHideTableReservation(hideTableReservation: boolean) {
        this.hideTableReservation = hideTableReservation;
    }

    public getEnableSendSMSPlaceOrder(): boolean {
        return this.enableSendSMSPlaceOrder;
    }

    public setEnableSendSMSPlaceOrder(enableSendSMSPlaceOrder: boolean) {
        this.enableSendSMSPlaceOrder = enableSendSMSPlaceOrder;
    }

    public getPackingChargeGstRate(): number {
        return this.packingChargeGstRate;
    }

    public setPackingChargeGstRate(value: number) {
        this.packingChargeGstRate = value;
    }

    public getDeliveryChargeGstRate(): number {
        return this.deliveryChargeGstRate;
    }

    public setDeliveryChargeGstRate(value: number) {
        this.deliveryChargeGstRate = value;
    }

    public getBranchName(): string {
        return this.branchName;
    }

    public setBranchName(branchName: string): void {
        this.branchName = branchName;
    }

    public getOtpExpiresAt(): number {
        return this.otpExpiresAt;
    }

    public setOtpExpiresAt(otpExpiresAt: number): void {
        this.otpExpiresAt = otpExpiresAt;
    }

    public getSchedule(): AvailabilitySchedule {
        return this.schedule;
    }

    public setSchedule(schedule: AvailabilitySchedule): void {
        this.schedule = schedule;
    }

    public getUrbanPiperInfo(): UrbanPiperInfo {
        return this.urbanPiperInfo;
    }

    public setUrbanPiperInfo(urbanPiperInfo: UrbanPiperInfo): void {
        this.urbanPiperInfo = urbanPiperInfo;
    }

    public getSettings(): RestaurantSettings {
        return this.settings;
    }

    public setSettings(settings: RestaurantSettings): void {
        this.settings = settings;
    }

    public getGoogleAccountInfo(): GoogleAccountInfo {
        return this.googleAccountInfo;
    }

    public setGoogleAccountInfo(googleAccountInfo: GoogleAccountInfo): void {
        this.googleAccountInfo = googleAccountInfo;
    }

    public IsAutoPrint(): boolean {
        return this.autoPrint;
    }
    public setAutoPrint(autoPrint: boolean): void {
        this.autoPrint = autoPrint;
    }
    public getNumberOfPrintCopies(): number {
        return this.numberOfPrintCopies;
    }
    public setNumberOfPrintCopies(numberOfPrintCopies: number): void {
        this.numberOfPrintCopies = numberOfPrintCopies;
    }
    public getOrderPlacedBy(): string {
        return this.orderPlacedBy;
    }
    public setOrderPlacedBy(orderPlacedBy: string): void {
        this.orderPlacedBy = orderPlacedBy;
    }
    public getRestaurantType(): string {
        return this.restaurantType;
    }

    public setRestaurantType(restaurantType: string): void {
        this.restaurantType = restaurantType;
    }

    public getOrderSequenceNumber(): number {
        return this.orderSequenceNumber;
    }

    public setOrderSequenceNumber(orderSequenceNumber: number): void {
        this.orderSequenceNumber = orderSequenceNumber;
    }


    public getCuisines(): Array<string> {
        return this.cuisines;
    }

    public setCuisines(cuisines: Array<string>): void {
        this.cuisines = cuisines;
    }


    public getAverageCostForTwo(): number {
        return this.averageCostForTwo;
    }

    public setAverageCostForTwo(averageCostForTwo: number): void {
        this.averageCostForTwo = averageCostForTwo;
    }

    public getPhotos(): Array<string> {
        return this.photos;
    }

    public setPhotos(photos: Array<string>): void {
        this.photos = photos;
    }

    public IsRazorPayDisabled(): boolean {
        return this.razorPayDisabled;
    }

    public setRazorPayDisabled(razorPayDisabled: boolean): void {
        this.razorPayDisabled = razorPayDisabled;
    }

    public getGeneralSettings(): GeneralSettings {
        return this.generalSettings;
    }

    public setGeneralSettings(generalSettings: GeneralSettings): void {
        this.generalSettings = generalSettings;
    }

    public getSocialLinks(): SocialLinks {
        return this.socialLinks;
    }

    public setSocialLinks(socialLinks: SocialLinks): void {
        this.socialLinks = socialLinks;
    }

    public getKitchenDisplaySystem(): KitchenDisplaySystem {
        return this.kitchenDisplaySystem;
    }

    public setKitchenDisplaySystem(kitchenDisplaySystem: KitchenDisplaySystem): void {
        this.kitchenDisplaySystem = kitchenDisplaySystem;
    }
}

export class ChannelPaymentModes {
    private channelType: ChannelType;
    private paymentModes: Array<string>;

    public getChannelType(): ChannelType {
        return this.channelType;
    }

    public setChannelType(channelType: ChannelType): void {
        this.channelType = channelType;
    }

    public getPaymentModes(): Array<string> {
        return this.paymentModes;
    }

    public setPaymentModes(paymentModes: Array<string>): void {
        this.paymentModes = paymentModes;
    }
}