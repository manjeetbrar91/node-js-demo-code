import { ServiceObject } from "../ServiceObject";



export enum FuelDiscountRecurrenceType {
    Unknown = "unknown",
    Daily = "daily",
}

export enum FuelDiscountType {
    Unknown = "unknown",
    Percentage = "percentage",
    FixedAmount = "fixedAmount",
}

export enum FuelDiscountSubType {
    Unknown = "unknown",
    Discount = "discount",
    Promotion = "promotion",
}
export enum FuelDiscountStatusType {
    expired = "expired",
    scheduled = "scheduled"
}


export class FuelDiscountCouponModel extends ServiceObject {
    // private scheduleDays: Schedule[];

    private accountType: string;
    private startTime: Date;
    private endTime: Date;
    private recurrence: FuelDiscountRecurrenceType;
    private discountType: FuelDiscountType;
    private discountSubType: FuelDiscountSubType;

    private discountMetadata: any;
    private name: string;
    private startDate: Date;
    private endDate: Date;
    private usageLimit: number;
    private perCustomerUsage: boolean;
    private limitTotalUsage: boolean;
    private actualUsage: number;
    private savedAmount: number;
    private summaryCardList: Array<string>;
    private unusableCount: number;
    private dontShowToCustomer: boolean;
    private createdBy: string;
    private fuelTypes: Array<string>;
    private fuelStationId: string;

    public getFuelStationId(): string {
        return this.fuelStationId;
    }

    public setFuelStationId(fuelStationId: string): void {
        this.fuelStationId = fuelStationId;
    }


    public getAccountType(): string {
        return this.accountType;
    }

    public setAccountType(accountType: string): void {
        this.accountType = accountType;
    }

    public getStartTime(): Date {
        return this.startTime;
    }

    public setStartTime(startTime: Date): void {
        this.startTime = startTime;
    }

    public getEndTime(): Date {
        return this.endTime;
    }

    public setEndTime(endTime: Date): void {
        this.endTime = endTime;
    }

    public getRecurrence(): FuelDiscountRecurrenceType {
        return this.recurrence;
    }

    public setRecurrence(recurrence: FuelDiscountRecurrenceType): void {
        this.recurrence = recurrence;
    }

    public getDiscountType(): FuelDiscountType {
        return this.discountType;
    }

    public setDiscountType(discountType: FuelDiscountType): void {
        this.discountType = discountType;
    }

    public getDiscountSubType(): FuelDiscountSubType {
        return this.discountSubType;
    }

    public setDiscountSubType(discountSubType: FuelDiscountSubType): void {
        this.discountSubType = discountSubType;
    }

    public getDiscountMetadata(): any {
        return this.discountMetadata;
    }

    public setDiscountMetadata(discountMetadata: any): void {
        this.discountMetadata = discountMetadata;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getUsageLimit(): number {
        return this.usageLimit;
    }

    public setUsageLimit(usageLimit: number): void {
        this.usageLimit = usageLimit;
    }

    public isPerCustomerUsage(): boolean {
        return this.perCustomerUsage;
    }

    public setPerCustomerUsage(perCustomerUsage: boolean): void {
        this.perCustomerUsage = perCustomerUsage;
    }

    public isLimitTotalUsage(): boolean {
        return this.limitTotalUsage;
    }

    public setLimitTotalUsage(limitTotalUsage: boolean): void {
        this.limitTotalUsage = limitTotalUsage;
    }

    public getActualUsage(): number {
        return this.actualUsage;
    }

    public setActualUsage(actualUsage: number): void {
        this.actualUsage = actualUsage;
    }

    public getSavedAmount(): number {
        return this.savedAmount;
    }

    public setSavedAmount(savedAmount: number): void {
        this.savedAmount = savedAmount;
    }

    public getSummaryCardList(): Array<string> {
        return this.summaryCardList;
    }

    public setSummaryCardList(summaryCardList: Array<string>): void {
        this.summaryCardList = summaryCardList;
    }

    public getUnusableCount(): number {
        return this.unusableCount;
    }

    public setUnusableCount(unusableCount: number): void {
        this.unusableCount = unusableCount;
    }

    public isDontShowToCustomer(): boolean {
        return this.dontShowToCustomer;
    }

    public setDontShowToCustomer(dontShowToCustomer: boolean): void {
        this.dontShowToCustomer = dontShowToCustomer;
    }

    public getCreatedBy(): string {
        return this.createdBy;
    }

    public setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy;
    }



    public getFuelTypes(): Array<string> {
        return this.fuelTypes;
    }

    public setFuelTypes(fuelTypes: Array<string>): void {
        this.fuelTypes = fuelTypes;
    }



}