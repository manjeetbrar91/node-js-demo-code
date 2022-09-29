import { ServiceObject } from "../../ServiceObject";
import { BusinessAvailabilityEnum } from "../BusinessAvailabilityEnum";
import { BusinessTypeEnum } from "../BusinessTypeEnum";
import { BusinessFuelStationModel, BusinessTimingModel } from "./BusinessResponseModel";

export class BusinessListResponseModel extends ServiceObject {
    
    private businessId: string;
    private businessName: string;
    private businessLegalName: string; 
    private businessType: BusinessTypeEnum;
    private startTime: string;
    private endTime: string;
    private addressLine1: string;
    private addressLine2: string;
    private locality: string;
    private state: string;
    private city: string;
    private country: string;
    private zipCode: string;
    private latitude: number;
    private longitude: number;
    private fuelStation: string;
    private distance: number;
    private distanceInKM: string;
    private fuelStationDetails: BusinessFuelStationModel;
    private businessTiming: Array<BusinessTimingModel>;
    private availabilityStatus: BusinessAvailabilityEnum;

    public getAvailabilityStatus(): BusinessAvailabilityEnum {
        return this.availabilityStatus;
    }

    public setAvailabilityStatus(availabilityStatus: BusinessAvailabilityEnum): void {
        this.availabilityStatus = availabilityStatus;
    }


    public getBusinessTiming(): Array<BusinessTimingModel> {
        return this.businessTiming;
    }

    public setBusinessTiming(businessTiming: Array<BusinessTimingModel>): void {
        this.businessTiming = businessTiming;
    }


    public getFuelStationDetails(): BusinessFuelStationModel {
        return this.fuelStationDetails;
    }

    public setFuelStationDetails(fuelStationDetails: BusinessFuelStationModel): void {
        this.fuelStationDetails = fuelStationDetails;
    }


    public getDistanceInKM(): string {
        return this.distanceInKM;
    }

    public setDistanceInKM(distanceInKM: string): void {
        this.distanceInKM = distanceInKM;
    }


    public getDistance(): number {
        return this.distance;
    }

    public setDistance(distance: number): void {
        this.distance = distance;
    }

    
    private averageRating: number;
    private ratingCount: number;

    
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

    public getFuelStation(): string {
        return this.fuelStation;
    }

    public setFuelStation(fuelStation: string): void {
        this.fuelStation = fuelStation;
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



     



}