import { ServiceObject } from "../../../../service-layer/models/ServiceObject";
import { OrderTypeEnum } from "../OrderTypeEnum";


export enum DiscountRecurrenceType {
    Unknown = "unknown",
    Daily = "daily",
}

export enum DiscountType {
    Unknown = "unknown",
    Percentage = "percentage",
    FixedAmount = "fixedAmount",
    BuyXGetY = "buyxgety"
}

export enum DiscountSubType {
    Unknown = "unknown",
    Discount = "discount",
    Promotion = "promotion",
}
export enum DiscountStatusType {
    expired = "expired",
    scheduled = "scheduled"
}


export class DiscountCouponModel extends ServiceObject {

    private accountType: string;
    private startTime: Date;
    private endTime: Date;
    private recurrence: DiscountRecurrenceType;
    private discountType: DiscountType;
    private discountSubType: DiscountSubType;
    /*following is a flexible json schema for which will depend on discountType. For eg:
    For order level flat discount, it will contain minOrder amount, discountAmount
    For order level percent discount, it will contain minOrder amount, discountPercent
    For item level flat discount, it will contain itemId, discountAmount
    For item level percent discount, it will contain itemId, discountPercent
    For items free with item, it will contain itemId to be ordered to get free Array<ItemIds> 
    */
    private discountMetadata: any;
    private name: string;
    private startDate: Date;
    private endDate: Date;
    private usageLimit: number;
    private perCustomerUsage: boolean;
    private limitTotalUsage: boolean;
    private actualUsage: number;
    private scheduleDays: Schedule[];
    private savedAmount: number;
    private summaryCardList: Array<string>;
    private unusableCount: number;
    private dontShowToCustomer: boolean;
    private createdBy: string;
    private businessId: string;
    private orderTypes: Array<OrderTypeEnum>;

    public getOrderTypes(): Array<OrderTypeEnum> {
        return this.orderTypes;
    }

    public setOrderTypes(orderTypes: Array<OrderTypeEnum>): void {
        this.orderTypes = orderTypes;
    }





    public getBusinessId(): string {
        return this.businessId;
    }

    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
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

    public getScheduleDays(): Schedule[] {
        return this.scheduleDays;
    }

    public setScheduleDays(scheduleDays: Schedule[]): void {
        this.scheduleDays = scheduleDays;
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

    public getRecurrence(): DiscountRecurrenceType {
        return this.recurrence;
    }

    public setRecurrence(recurrence: DiscountRecurrenceType): void {
        this.recurrence = recurrence;
    }

    public getDiscountType(): DiscountType {
        return this.discountType;
    }

    public setDiscountType(discountType: DiscountType): void {
        this.discountType = discountType;
    }

    public getDiscountSubType(): DiscountSubType {
        return this.discountSubType;
    }

    public setDiscountSubType(discountSubType: DiscountSubType): void {
        this.discountSubType = discountSubType;
    }

    public getDiscountMetadata(): any {
        return this.discountMetadata;
    }

    public setDiscountMetadata(discountMetadata: any): void {
        this.discountMetadata = discountMetadata;
    }
}

export enum ScheduleType {
    all = "all",
    selected = "selected"
}
export class Schedule {
    private scheduleType: ScheduleType;
    private schedule: Array<ScheduleDay>;

    public getScheduleType(): ScheduleType {
        return this.scheduleType;
    }

    public setScheduleType(scheduleType: ScheduleType): void {
        this.scheduleType = scheduleType;
    }

    public getSchedule(): Array<ScheduleDay> {
        return this.schedule;
    }

    public setSchedule(schedule: Array<ScheduleDay>): void {
        this.schedule = schedule;
    }
}


export class ScheduleDay {
    private day: String;
    private timeSlot: Array<TimeSlot>;


    public getDay(): String {
        return this.day;
    }

    public setDay(day: String): void {
        this.day = day;
    }

    public getTimeSlot(): Array<TimeSlot> {
        return this.timeSlot;
    }

    public setTimeSlot(value: Array<TimeSlot>) {
        this.timeSlot = value;
    }
}


export class TimeSlot {
    private from: number;
    private to: number;

    public getTo(): number {
        return this.to;
    }

    public setTo(value: number) {
        this.to = value;
    }

    public getFrom(): number {
        return this.from;
    }

    public setFrom(value: number) {
        this.from = value;
    }
}