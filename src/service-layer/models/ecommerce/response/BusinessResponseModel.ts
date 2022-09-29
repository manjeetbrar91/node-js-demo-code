import { ServiceObject } from "../../ServiceObject";
import { BusinessAvailabilityEnum } from "../BusinessAvailabilityEnum";
import { BusinessTypeEnum } from "../BusinessTypeEnum";
import { DaysEnum } from "../DaysEnum";
export class BusinessGeoLocation {
    private type: string;
    private coordinates: number[];

    constructor(latitude: number, longitude: number) {
        this.type = "Point";
        this.coordinates = [longitude, latitude]
    }
    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getCoordinates(): number[] {
        return this.coordinates;
    }

    public setCoordinates(coordinates: number[]): void {
        this.coordinates = coordinates;
    }

}
export class BusinessCurrencyModel {
    private currency: string;
    private currencySymbol: string;
    private currencyConversion: number;
    private primaryCurrency: boolean;
    private deleteCurrency: boolean;

    public isDeleteCurrency(): boolean {
        return this.deleteCurrency;
    }

    public setDeleteCurrency(deleteCurrency: boolean): void {
        this.deleteCurrency = deleteCurrency;
    }


    public isPrimaryCurrency(): boolean {
        return this.primaryCurrency;
    }

    public setPrimaryCurrency(primaryCurrency: boolean): void {
        this.primaryCurrency = primaryCurrency;
    }


    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getCurrencySymbol(): string {
        return this.currencySymbol;
    }

    public setCurrencySymbol(currencySymbol: string): void {
        this.currencySymbol = currencySymbol;
    }

    public getCurrencyConversion(): number {
        if (this.currencyConversion == undefined || this.currencyConversion == 0) {
            this.currencyConversion = 1;
        }
        return this.currencyConversion;
    }

    public setCurrencyConversion(currencyConversion: number): void {
        this.currencyConversion = currencyConversion;
    }



}
export class BusinessTimingModel {
    private day: DaysEnum;
    private open: boolean;
    private start: number;// For 12AM = 0, For 12PM=720, For 11.59 PM = 1439
    private end: number;
    private open24X7: boolean;

    public isOpen24X7(): boolean {
        return this.open24X7;
    }

    public setOpen24X7(open24X7: boolean): void {
        this.open24X7 = open24X7;
    }


    public getDay(): DaysEnum {
        return this.day;
    }

    public setDay(day: DaysEnum): void {
        this.day = day;
    }

    public isOpen(): boolean {
        return this.open;
    }

    public setOpen(open: boolean): void {
        this.open = open;
    }

    public getStart(): number {
        return this.start;
    }

    public setStart(start: number): void {
        this.start = start;
    }

    public getEnd(): number {
        return this.end;
    }

    public setEnd(end: number): void {
        this.end = end;
    }


}
export class BusinessDeliveryCharges {
    private baseDistanceCharges: number;
    private baseDistance: number;
    private extraPerKM: number;
    private baseWeightCharges: number;
    private baseWeight: number;
    private extraPerKG: number;

    public initDefault(){
        this.baseDistanceCharges = 0;
        this.baseDistance = 0;
        this.extraPerKG = 0;
        this.baseWeight = 0;
        this.baseWeightCharges = 0;
        this.extraPerKM = 0;
    }
    public getBaseDistanceCharges(): number {
        return this.baseDistanceCharges;
    }

    public setBaseDistanceCharges(baseDistanceCharges: number): void {
        this.baseDistanceCharges = baseDistanceCharges;
    }

    public getBaseDistance(): number {
        return this.baseDistance;
    }

    public setBaseDistance(baseDistance: number): void {
        this.baseDistance = baseDistance;
    }

    public getExtraPerKM(): number {
        return this.extraPerKM;
    }

    public setExtraPerKM(extraPerKM: number): void {
        this.extraPerKM = extraPerKM;
    }

    public getBaseWeightCharges(): number {
        return this.baseWeightCharges;
    }

    public setBaseWeightCharges(baseWeightCharges: number): void {
        this.baseWeightCharges = baseWeightCharges;
    }

    public getBaseWeight(): number {
        return this.baseWeight;
    }

    public setBaseWeight(baseWeight: number): void {
        this.baseWeight = baseWeight;
    }

    public getExtraPerKG(): number {
        return this.extraPerKG;
    }

    public setExtraPerKG(extraPerKG: number): void {
        this.extraPerKG = extraPerKG;
    }



}
export class BusinessDeliverySettings {
    private homeDelivery: boolean;
    private inCarDelivery: boolean;
    private inStorePickUp: boolean;
    private homeDeliveryChargesEnabled: boolean;
    private homeDeliveryCharges: BusinessDeliveryCharges;
    private freeHomeDelivery:boolean;
    private freeHomeDeliveryOrderAmount:number;
    private maxHomeDevliveryDistance:number;
    private packagingCharges:number;
    private packagingChargesPerItems:boolean;
    private packagingChargesICD:number;
    private packagingChargesPerItemsICD:boolean;
    private packagingChargesISP:number;
    private packagingChargesPerItemsISP:boolean;

    public getPackagingChargesICD(): number {
        return this.packagingChargesICD;
    }

    public setPackagingChargesICD(packagingChargesICD: number): void {
        this.packagingChargesICD = packagingChargesICD;
    }

    public isPackagingChargesPerItemsICD(): boolean {
        return this.packagingChargesPerItemsICD;
    }

    public setPackagingChargesPerItemsICD(packagingChargesPerItemsICD: boolean): void {
        this.packagingChargesPerItemsICD = packagingChargesPerItemsICD;
    }

    public getPackagingChargesISP(): number {
        return this.packagingChargesISP;
    }

    public setPackagingChargesISP(packagingChargesISP: number): void {
        this.packagingChargesISP = packagingChargesISP;
    }

    public isPackagingChargesPerItemsISP(): boolean {
        return this.packagingChargesPerItemsISP;
    }

    public setPackagingChargesPerItemsISP(packagingChargesPerItemsISP: boolean): void {
        this.packagingChargesPerItemsISP = packagingChargesPerItemsISP;
    }



    public isHomeDeliveryChargesEnabled(): boolean {
        return this.homeDeliveryChargesEnabled;
    }

    public setHomeDeliveryChargesEnabled(homeDeliveryChargesEnabled: boolean): void {
        this.homeDeliveryChargesEnabled = homeDeliveryChargesEnabled;
    }

    public getHomeDeliveryCharges(): BusinessDeliveryCharges {
        return this.homeDeliveryCharges;
    }

    public setHomeDeliveryCharges(homeDeliveryCharges: BusinessDeliveryCharges): void {
        this.homeDeliveryCharges = homeDeliveryCharges;
    }

    public isFreeHomeDelivery(): boolean {
        return this.freeHomeDelivery;
    }

    public setFreeHomeDelivery(freeHomeDelivery: boolean): void {
        this.freeHomeDelivery = freeHomeDelivery;
    }

    public getFreeHomeDeliveryOrderAmount(): number {
        return this.freeHomeDeliveryOrderAmount;
    }

    public setFreeHomeDeliveryOrderAmount(freeHomeDeliveryOrderAmount: number): void {
        this.freeHomeDeliveryOrderAmount = freeHomeDeliveryOrderAmount;
    }

    public getMaxHomeDevliveryDistance(): number {
        return this.maxHomeDevliveryDistance;
    }

    public setMaxHomeDevliveryDistance(maxHomeDevliveryDistance: number): void {
        this.maxHomeDevliveryDistance = maxHomeDevliveryDistance;
    }

    public getPackagingCharges(): number {
        return this.packagingCharges;
    }

    public setPackagingCharges(packagingCharges: number): void {
        this.packagingCharges = packagingCharges;
    }

    public isPackagingChargesPerItems(): boolean {
        return this.packagingChargesPerItems;
    }

    public setPackagingChargesPerItems(packagingChargesPerItems: boolean): void {
        this.packagingChargesPerItems = packagingChargesPerItems;
    }


    public isHomeDelivery(): boolean {
        return this.homeDelivery;
    }

    public setHomeDelivery(homeDelivery: boolean): void {
        this.homeDelivery = homeDelivery;
    }

    public isInCarDelivery(): boolean {
        return this.inCarDelivery;
    }

    public setInCarDelivery(inCarDelivery: boolean): void {
        this.inCarDelivery = inCarDelivery;
    }

    public isInStorePickUp(): boolean {
        return this.inStorePickUp;
    }

    public setInStorePickUp(inStorePickUp: boolean): void {
        this.inStorePickUp = inStorePickUp;
    }




}
export class BusinessFuelStationModel {

    private name: string;
    private latitude: string;
    private longitude: string;
    private pincode: string;
    private country: string;
    private state: string;
    private dealerCode: string;
    private address: string;
    private city: string;
    private mobileNumber: string;
    private countryCode: string;
    private availability: boolean;
    private fuelStationId: string;
    private image: string;
    private isOpen: boolean;
    private fuelCompanyName: string;

    public getFuelCompanyName(): string {
        return this.fuelCompanyName;
    }

    public setFuelCompanyName(fuelCompanyName: string): void {
        this.fuelCompanyName = fuelCompanyName;
    }


    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLatitude(): string {
        return this.latitude;
    }

    public setLatitude(latitude: string): void {
        this.latitude = latitude;
    }

    public getLongitude(): string {
        return this.longitude;
    }

    public setLongitude(longitude: string): void {
        this.longitude = longitude;
    }

    public getPincode(): string {
        return this.pincode;
    }

    public setPincode(pincode: string): void {
        this.pincode = pincode;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getDealerCode(): string {
        return this.dealerCode;
    }

    public setDealerCode(dealerCode: string): void {
        this.dealerCode = dealerCode;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

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

    public isAvailability(): boolean {
        return this.availability;
    }

    public setAvailability(availability: boolean): void {
        this.availability = availability;
    }

    public getFuelStationId(): string {
        return this.fuelStationId;
    }

    public setFuelStationId(fuelStationId: string): void {
        this.fuelStationId = fuelStationId;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public isIsOpen(): boolean {
        return this.isOpen;
    }

    public setIsOpen(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

}
export class BusinessUPIDetails {

    private primary: boolean;
    //Ex abc@okaxis.com

    private payeeAdress: string;
    //Ex Paytm Merchant, XYZ Pvt. Ltd., etc....

    private payeeName: string;
    // E.g. GPAY, PhonePay, Paytm etc..
    private upiType: string;


    // E.g. 0000
    private merchantCode: string;
    private currency: string;
    private status: string;

    public isPrimary(): boolean {
        return this.primary;
    }

    public setPrimary(primary: boolean): void {
        this.primary = primary;
    }

    public getPayeeAdress(): string {
        return this.payeeAdress;
    }

    public setPayeeAdress(payeeAdress: string): void {
        this.payeeAdress = payeeAdress;
    }

    public getPayeeName(): string {
        return this.payeeName;
    }

    public setPayeeName(payeeName: string): void {
        this.payeeName = payeeName;
    }

    public getUpiType(): string {
        return this.upiType;
    }

    public setUpiType(upiType: string): void {
        this.upiType = upiType;
    }

    public getMerchantCode(): string {
        return this.merchantCode;
    }

    public setMerchantCode(merchantCode: string): void {
        this.merchantCode = merchantCode;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }


}
export class BusinessBankDetails {
    private accountName: string;
    private accountNumber: string;
    private bankName: string;
    private bankBranchName: string;
    private bankIFSC: string;

    public getAccountName(): string {
        return this.accountName;
    }

    public setAccountName(accountName: string): void {
        this.accountName = accountName;
    }

    public getAccountNumber(): string {
        return this.accountNumber;
    }

    public setAccountNumber(accountNumber: string): void {
        this.accountNumber = accountNumber;
    }

    public getBankName(): string {
        return this.bankName;
    }

    public setBankName(bankName: string): void {
        this.bankName = bankName;
    }

    public getBankBranchName(): string {
        return this.bankBranchName;
    }

    public setBankBranchName(bankBranchName: string): void {
        this.bankBranchName = bankBranchName;
    }

    public getBankIFSC(): string {
        return this.bankIFSC;
    }

    public setBankIFSC(bankIFSC: string): void {
        this.bankIFSC = bankIFSC;
    }


}
export class BusinessPaymentSettings {
    private online: boolean;
    private cod: boolean;
    private bankDetails: BusinessBankDetails;
    private upi: Array<BusinessUPIDetails>;

    public getUpi(): Array<BusinessUPIDetails> {
        return this.upi;
    }

    public setUpi(upi: Array<BusinessUPIDetails>): void {
        this.upi = upi;
    }


    public getBankDetails(): BusinessBankDetails {
        return this.bankDetails;
    }

    public setBankDetails(bankDetails: BusinessBankDetails): void {
        this.bankDetails = bankDetails;
    }


    public isOnline(): boolean {
        return this.online;
    }

    public setOnline(online: boolean): void {
        this.online = online;
    }

    public isCod(): boolean {
        return this.cod;
    }

    public setCod(cod: boolean): void {
        this.cod = cod;
    }


}
export class BusinessResponseModel extends ServiceObject {
    private ownerId: string;
    private businessId: string;
    private businessName: string;
    private businessLegalName: string;

    private gstNumber: string;
    private businessType: BusinessTypeEnum;
    private startTime: string;
    private endTime: string;

    private countryCode: string;
    private phoneNumber: string;
    private primaryLanguage: string;
    private primaryCurrency: string;

    private primaryCurrencySymbol: string;
    private addressLine1: string;
    private addressLine2: string;
    private locality: string;

    private state: string;
    private city: string;
    private country: string;
    private countryAbbreviation: string;

    private zipCode: string;
    private latitude: number;
    private longitude: number;
    private fuelStation: string;
    private emailAddress: string;
    private averageRating: number;
    private ratingCount: number;
    private altNumber: string;
    private geoLocation: BusinessGeoLocation;
    private orderSequenceNumber: number;
    private orderSequenceNumberPrefix: string;
    private deliverySettings: BusinessDeliverySettings;
    private businessTiming: Array<BusinessTimingModel>;
    private businessCurrencySettings: Array<BusinessCurrencyModel>;
    private fuelStationDetails: BusinessFuelStationModel;
    private paymentSettings: BusinessPaymentSettings;
    private availabilityStatus: BusinessAvailabilityEnum;

    public getAvailabilityStatus(): BusinessAvailabilityEnum {
        return this.availabilityStatus;
    }

    public setAvailabilityStatus(availabilityStatus: BusinessAvailabilityEnum): void {
        this.availabilityStatus = availabilityStatus;
    }


    public getPaymentSettings(): BusinessPaymentSettings {
        return this.paymentSettings;
    }

    public setPaymentSettings(paymentSettings: BusinessPaymentSettings): void {
        this.paymentSettings = paymentSettings;
    }


    public getFuelStationDetails(): BusinessFuelStationModel {
        return this.fuelStationDetails;
    }

    public setFuelStationDetails(fuelStationDetails: BusinessFuelStationModel): void {
        this.fuelStationDetails = fuelStationDetails;
    }


    public getBusinessCurrencySettings(): Array<BusinessCurrencyModel> {
        if (this.businessCurrencySettings == undefined) {
            this.businessCurrencySettings = [];
        }
        return this.businessCurrencySettings;
    }

    public setBusinessCurrencySettings(businessCurrencySettings: Array<BusinessCurrencyModel>): void {
        this.businessCurrencySettings = businessCurrencySettings;
    }


    public getBusinessTiming(): Array<BusinessTimingModel> {
        return this.businessTiming;
    }

    public setBusinessTiming(businessTiming: Array<BusinessTimingModel>): void {
        this.businessTiming = businessTiming;
    }




    public getDeliverySettings(): BusinessDeliverySettings {
        return this.deliverySettings;
    }

    public setDeliverySettings(deliverySettings: BusinessDeliverySettings): void {
        this.deliverySettings = deliverySettings;
    }


    public getOrderSequenceNumber(): number {
        return this.orderSequenceNumber;
    }

    public setOrderSequenceNumber(orderSequenceNumber: number): void {
        this.orderSequenceNumber = orderSequenceNumber;
    }

    public getOrderSequenceNumberPrefix(): string {
        return this.orderSequenceNumberPrefix;
    }

    public setOrderSequenceNumberPrefix(orderSequenceNumberPrefix: string): void {
        this.orderSequenceNumberPrefix = orderSequenceNumberPrefix;
    }

    public getGeoLocation(): BusinessGeoLocation {
        return this.geoLocation;
    }

    public setGeoLocation(geoLocation: BusinessGeoLocation): void {
        this.geoLocation = geoLocation;
    }


    public getAltNumber(): string {
        return this.altNumber;
    }

    public setAltNumber(altNumber: string): void {
        this.altNumber = altNumber;
    }


    public getFuelStation(): string {
        return this.fuelStation;
    }

    public setFuelStation(fuelStation: string): void {
        this.fuelStation = fuelStation;
    }

    public getEmailAddress(): string {
        return this.emailAddress;
    }

    public setEmailAddress(emailAddress: string): void {
        this.emailAddress = emailAddress;
    }

    public getAverageRating(): number {
        return this.averageRating;
    }

    public setAverageRating(averageRating: number): void {
        this.averageRating = averageRating;
    }

    public getRatingCount(): number {
        return this.ratingCount;
    }

    public setRatingCount(ratingCount: number): void {
        this.ratingCount = ratingCount;
    }




    public getOwnerId(): string {
        return this.ownerId;
    }

    public setOwnerId(ownerId: string): void {
        this.ownerId = ownerId;
    }

    public getBusinessId(): string {
        return this.businessId;
    }

    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
    }

    public getBusinessName(): string {
        return this.businessName;
    }

    public setBusinessName(businessName: string): void {
        this.businessName = businessName;
    }

    public getBusinessLegalName(): string {
        return this.businessLegalName;
    }

    public setBusinessLegalName(businessLegalName: string): void {
        this.businessLegalName = businessLegalName;
    }

    public getGstNumber(): string {
        return this.gstNumber;
    }

    public setGstNumber(gstNumber: string): void {
        this.gstNumber = gstNumber;
    }

    public getBusinessType(): BusinessTypeEnum {
        return this.businessType;
    }

    public setBusinessType(businessType: BusinessTypeEnum): void {
        this.businessType = businessType;
    }

    public getStartTime(): string {
        return this.startTime;
    }

    public setStartTime(startTime: string): void {
        this.startTime = startTime;
    }

    public getEndTime(): string {
        return this.endTime;
    }

    public setEndTime(endTime: string): void {
        this.endTime = endTime;
    }

    public getCountryCode(): string {
        return this.countryCode;
    }

    public setCountryCode(countryCode: string): void {
        this.countryCode = countryCode;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getPrimaryLanguage(): string {
        return this.primaryLanguage;
    }

    public setPrimaryLanguage(primaryLanguage: string): void {
        this.primaryLanguage = primaryLanguage;
    }

    public getPrimaryCurrency(): string {
        return this.primaryCurrency;
    }

    public setPrimaryCurrency(primaryCurrency: string): void {
        this.primaryCurrency = primaryCurrency;
    }

    public getPrimaryCurrencySymbol(): string {
        return this.primaryCurrencySymbol;
    }

    public setPrimaryCurrencySymbol(primaryCurrencySymbol: string): void {
        this.primaryCurrencySymbol = primaryCurrencySymbol;
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

    public getLocality(): string {
        return this.locality;
    }

    public setLocality(locality: string): void {
        this.locality = locality;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getCountryAbbreviation(): string {
        return this.countryAbbreviation;
    }

    public setCountryAbbreviation(countryAbbreviation: string): void {
        this.countryAbbreviation = countryAbbreviation;
    }

    public getZipCode(): string {
        return this.zipCode;
    }

    public setZipCode(zipCode: string): void {
        this.zipCode = zipCode;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }



}