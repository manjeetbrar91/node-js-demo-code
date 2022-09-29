import { OrderExtraCharge } from "./OrderExtraCharge";
import { ServiceObject } from "../ServiceObject";
import { OrderPaymentsModel } from "./OrderPaymentsModel";
import { OrderProductsModel } from "./OrderProductsModel";
import { OrderCreatedFrom, OrderPaymentType, OrderStatusEnum } from "./OrderStatusEnum";
import { UserDeliveryAddressModel } from "./response/UserDeliveryAddressModel";
import { UserDetailsModel } from "./response/UserDetailsModel";
import { AppointmentStatusEnum } from "./AppointmentStatusEnum";

export class CustomerOrderModel extends ServiceObject {
    private businessId: string;
    private userId: string;
    private pickUpDate: string;
    private pickUpTime: string;
    private phoneNumber: string;
    private roundedOffValue: number;
    private orderStatus: string;
    private channelOrderStatus: OrderStatusEnum;
    private cancellationReason: string;
    private notes: string;
    private paymentStatus: string;


    private inCarDeliveryInfo: []

    private deliveryAddress: UserDeliveryAddressModel;

    private onlinePayment: boolean;

    private transactionType: string;

    private instructions: string;
    private totalBill: number;
    private totalTax: number;
    private subTotal: number;
    private netRevenue: number;
    private grossRevenue: number;
    private packingCharges: number;

    private extraFeeUser: number;
    private extraFeeBusiness: number;
    private deliveryCharges: number;
    private extraCharges: Array<OrderExtraCharge>
    private unread: boolean;
    private totalDiscount: number;
    private products: Array<OrderProductsModel>;
    private orderType: string;

    private statusHistory: []
    private orderCancellationDate: string;
    private gstName: string;
    private gstNumber: string;
    private payments: Array<OrderPaymentsModel>;
    private businessName: string;
    private businessContactNumber: string;
    private businessLatitude: number;
    private businessLongitude: number;
    private user: UserDetailsModel;
    private billNumber: string;
    private vehicleNo: string;
    private mobileNo: string;

    private currency: string;
    private currencySymbol: string;
    private currencyConversion: number;
    private deliveryDate: string;
    
    
    
    
    private apptDate: string;
    private apptTime: string;
    private apptRemarksByUser: string;
    private apptRemarksByBusiness: string;
    private apptSuggestedDate: string;
    private apptSuggestedTime: string;
    private apptStatus: AppointmentStatusEnum;
    private paymentType: OrderPaymentType;
    private businessCountryCode: string;
    private alreadyReached: boolean;
    private employeeId: string;
    private createdFrom: OrderCreatedFrom;
    private employeeName: string;
    private customDiscountPercentage: number;
    private customDiscountAmount: number;
    private customDiscount: CustomDiscount;
    private couponCode: string;

    public getCouponCode(): string {
        return this.couponCode;
    }

    public setCouponCode(couponCode: string): void {
        this.couponCode = couponCode;
    }


    public getCustomDiscount(): CustomDiscount {
        return this.customDiscount;
    }

    public setCustomDiscount(customDiscount: CustomDiscount): void {
        this.customDiscount = customDiscount;
    }


    public getCustomDiscountPercentage(): number {
        return this.customDiscountPercentage;
    }

    public setCustomDiscountPercentage(customDiscountPercentage: number): void {
        this.customDiscountPercentage = customDiscountPercentage;
    }

    public getCustomDiscountAmount(): number {
        return this.customDiscountAmount;
    }

    public setCustomDiscountAmount(customDiscountAmount: number): void {
        this.customDiscountAmount = customDiscountAmount;
    }


    public getExtraFeeUser(): number {
        if (this.extraFeeUser == undefined) {
            this.extraFeeUser = 0;
        }
        return this.extraFeeUser;
    }

    public setExtraFeeUser(extraFeeUser: number): void {
        this.extraFeeUser = extraFeeUser;
    }

    public getExtraFeeBusiness(): number {
        if (this.extraFeeBusiness == undefined) {
            this.extraFeeBusiness = 0;
        }
        return this.extraFeeBusiness;
    }

    public setExtraFeeBusiness(extraFeeBusiness: number): void {
        this.extraFeeBusiness = extraFeeBusiness;
    }


    public getEmployeeName(): string {
        return this.employeeName;
    }

    public setEmployeeName(employeeName: string): void {
        this.employeeName = employeeName;
    }


    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getCreatedFrom(): OrderCreatedFrom {
        return this.createdFrom;
    }

    public setCreatedFrom(createdFrom: OrderCreatedFrom): void {
        this.createdFrom = createdFrom;
    }


    public isAlreadyReached(): boolean {
        return this.alreadyReached;
    }

    public setAlreadyReached(alreadyReached: boolean): void {
        this.alreadyReached = alreadyReached;
    }





    public getBusinessCountryCode(): string {
        return this.businessCountryCode;
    }

    public setBusinessCountryCode(businessCountryCode: string): void {
        this.businessCountryCode = businessCountryCode;
    }


    public getPaymentType(): OrderPaymentType {
        return this.paymentType;
    }

    public setPaymentType(paymentType: OrderPaymentType): void {
        this.paymentType = paymentType;
    }


    public getApptStatus(): AppointmentStatusEnum {
        return this.apptStatus;
    }

    public setApptStatus(apptStatus: AppointmentStatusEnum): void {
        this.apptStatus = apptStatus;
    }

    public getApptDate(): string {
        return this.apptDate;
    }

    public setApptDate(apptDate: string): void {
        this.apptDate = apptDate;
    }

    public getApptTime(): string {
        return this.apptTime;
    }

    public setApptTime(apptTime: string): void {
        this.apptTime = apptTime;
    }



    public getApptRemarksByUser(): string {
        return this.apptRemarksByUser;
    }

    public setApptRemarksByUser(apptRemarksByUser: string): void {
        this.apptRemarksByUser = apptRemarksByUser;
    }

    public getApptRemarksByBusiness(): string {
        return this.apptRemarksByBusiness;
    }

    public setApptRemarksByBusiness(apptRemarksByBusiness: string): void {
        this.apptRemarksByBusiness = apptRemarksByBusiness;
    }

    public getApptSuggestedDate(): string {
        return this.apptSuggestedDate;
    }

    public setApptSuggestedDate(apptSuggestedDate: string): void {
        this.apptSuggestedDate = apptSuggestedDate;
    }

    public getApptSuggestedTime(): string {
        return this.apptSuggestedTime;
    }

    public setApptSuggestedTime(apptSuggestedTime: string): void {
        this.apptSuggestedTime = apptSuggestedTime;
    }



    public getDeliveryDate(): string {
        return this.deliveryDate;
    }

    public setDeliveryDate(deliveryDate: string): void {
        this.deliveryDate = deliveryDate;
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
        return this.currencyConversion;
    }

    public setCurrencyConversion(currencyConversion: number): void {
        this.currencyConversion = currencyConversion;
    }


    public getVehicleNo(): string {
        return this.vehicleNo;
    }

    public setVehicleNo(vehicleNo: string): void {
        this.vehicleNo = vehicleNo;
    }

    public getMobileNo(): string {
        return this.mobileNo;
    }

    public setMobileNo(mobileNo: string): void {
        this.mobileNo = mobileNo;
    }

    public getBillNumber(): string {
        return this.billNumber;
    }

    public setBillNumber(billNumber: string): void {
        this.billNumber = billNumber;
    }


    public getUser(): UserDetailsModel {
        return this.user;
    }

    public setUser(user: UserDetailsModel): void {
        this.user = user;
    }


    public getBusinessName(): string {
        return this.businessName;
    }

    public setBusinessName(businessName: string): void {
        this.businessName = businessName;
    }

    public getBusinessContactNumber(): string {
        return this.businessContactNumber;
    }

    public setBusinessContactNumber(businessContactNumber: string): void {
        this.businessContactNumber = businessContactNumber;
    }

    public getBusinessLatitude(): number {
        return this.businessLatitude;
    }

    public setBusinessLatitude(businessLatitude: number): void {
        this.businessLatitude = businessLatitude;
    }

    public getBusinessLongitude(): number {
        return this.businessLongitude;
    }

    public setBusinessLongitude(businessLongitude: number): void {
        this.businessLongitude = businessLongitude;
    }


    public getBusinessId(): string {
        return this.businessId;
    }

    public setBusinessId(businessId: string): void {
        this.businessId = businessId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getPickUpDate(): string {
        return this.pickUpDate;
    }

    public setPickUpDate(pickUpDate: string): void {
        this.pickUpDate = pickUpDate;
    }

    public getPickUpTime(): string {
        return this.pickUpTime;
    }

    public setPickUpTime(pickUpTime: string): void {
        this.pickUpTime = pickUpTime;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getRoundedOffValue(): number {
        return this.roundedOffValue;
    }

    public setRoundedOffValue(roundedOffValue: number): void {
        this.roundedOffValue = roundedOffValue;
    }

    public getOrderStatus(): string {
        return this.orderStatus;
    }

    public setOrderStatus(orderStatus: string): void {
        this.orderStatus = orderStatus;
    }

    public getChannelOrderStatus(): OrderStatusEnum {
        return this.channelOrderStatus;
    }

    public setChannelOrderStatus(channelOrderStatus: OrderStatusEnum): void {
        this.channelOrderStatus = channelOrderStatus;
    }

    public getCancellationReason(): string {
        return this.cancellationReason;
    }

    public setCancellationReason(cancellationReason: string): void {
        this.cancellationReason = cancellationReason;
    }

    public getNotes(): string {
        return this.notes;
    }

    public setNotes(notes: string): void {
        this.notes = notes;
    }

    public getPaymentStatus(): string {
        return this.paymentStatus;
    }

    public setPaymentStatus(paymentStatus: string): void {
        this.paymentStatus = paymentStatus;
    }

    public getInCarDeliveryInfo(): [] {
        return this.inCarDeliveryInfo;
    }

    public setInCarDeliveryInfo(inCarDeliveryInfo: []): void {
        this.inCarDeliveryInfo = inCarDeliveryInfo;
    }

    public getDeliveryAddress(): UserDeliveryAddressModel {
        return this.deliveryAddress;
    }

    public setDeliveryAddress(deliveryAddress: UserDeliveryAddressModel): void {
        this.deliveryAddress = deliveryAddress;
    }

    public isOnlinePayment(): boolean {
        return this.onlinePayment;
    }

    public setOnlinePayment(onlinePayment: boolean): void {
        this.onlinePayment = onlinePayment;
    }

    public getTransactionType(): string {
        return this.transactionType;
    }

    public setTransactionType(transactionType: string): void {
        this.transactionType = transactionType;
    }

    public getInstructions(): string {
        return this.instructions;
    }

    public setInstructions(instructions: string): void {
        this.instructions = instructions;
    }

    public getTotalBill(): number {
        return this.totalBill;
    }

    public setTotalBill(totalBill: number): void {
        this.totalBill = totalBill;
    }

    public getTotalTax(): number {
        return this.totalTax;
    }

    public setTotalTax(totalTax: number): void {
        this.totalTax = totalTax;
    }

    public getSubTotal(): number {
        return this.subTotal;
    }

    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }

    public getNetRevenue(): number {
        return this.netRevenue;
    }

    public setNetRevenue(netRevenue: number): void {
        this.netRevenue = netRevenue;
    }

    public getGrossRevenue(): number {
        return this.grossRevenue;
    }

    public setGrossRevenue(grossRevenue: number): void {
        this.grossRevenue = grossRevenue;
    }

    public getPackingCharges(): number {
        if (this.packingCharges == undefined) {
            this.packingCharges = 0;
        }
        return this.packingCharges;
    }

    public setPackingCharges(packingCharges: number): void {
        this.packingCharges = packingCharges;
    }

    public getDeliveryCharges(): number {
        if (this.deliveryCharges == undefined) {
            this.deliveryCharges = 0;
        }
        return this.deliveryCharges;
    }

    public setDeliveryCharges(deliveryCharges: number): void {
        this.deliveryCharges = deliveryCharges;
    }

    public getExtraCharges(): Array<OrderExtraCharge> {
        return this.extraCharges;
    }

    public setExtraCharges(extraCharges: Array<OrderExtraCharge>): void {
        this.extraCharges = extraCharges;
    }

    public isUnread(): boolean {
        return this.unread;
    }

    public setUnread(unread: boolean): void {
        this.unread = unread;
    }



    public getTotalDiscount(): number {
        if (this.totalDiscount == undefined) {
            this.totalDiscount = 0
        }
        return this.totalDiscount;
    }

    public setTotalDiscount(totalDiscount: number): void {
        this.totalDiscount = totalDiscount;
    }

    public getProducts(): Array<OrderProductsModel> {
        return this.products;
    }

    public setProducts(products: Array<OrderProductsModel>): void {
        this.products = products;
    }

    public getOrderType(): string {
        return this.orderType;
    }

    public setOrderType(orderType: string): void {
        this.orderType = orderType;
    }

    public getStatusHistory(): [] {
        return this.statusHistory;
    }

    public setStatusHistory(statusHistory: []): void {
        this.statusHistory = statusHistory;
    }

    public getOrderCancellationDate(): string {
        return this.orderCancellationDate;
    }

    public setOrderCancellationDate(orderCancellationDate: string): void {
        this.orderCancellationDate = orderCancellationDate;
    }

    public getGstName(): string {
        return this.gstName;
    }

    public setGstName(gstName: string): void {
        this.gstName = gstName;
    }

    public getGstNumber(): string {
        return this.gstNumber;
    }

    public setGstNumber(gstNumber: string): void {
        this.gstNumber = gstNumber;
    }

    public getPayments(): Array<OrderPaymentsModel> {
        return this.payments;
    }

    public setPayments(payments: Array<OrderPaymentsModel>): void {
        this.payments = payments;
    }

}
export class CustomDiscount {
    private amount: number;
    private totalDiscount: number;
    private percentage: number;
    private discountType: string;
    private discountNotes: string;

    private items: Array<CustomDiscountItems>;
    private categoryItemsList: Array<CustomDiscountItems>;
    private tagItemsList: Array<CustomDiscountItems>;
    private category: Array<CategoryDiscount>; 
    private isFixed: boolean;

    private promotionDiscount: boolean;
    private promotionId: string;
    private mainDiscountType: string;
    private discountCoupon: string;



    public initEmpty(): void {
        this.isFixed = false
        this.items = [];
        this.category = []
         
        this.tagItemsList = []
        this.categoryItemsList = []
        this.discountNotes = "";
        this.mainDiscountType = "";
        this.discountCoupon = "";
    }

    public getMainDiscountType(): string {
        return this.mainDiscountType;
    }

    public setMainDiscountType(mainDiscountType: string): void {
        this.mainDiscountType = mainDiscountType;
    }

    public getDiscountCoupon(): string {
        return this.discountCoupon;
    }

    public setDiscountCoupon(discountCoupon: string): void {
        this.discountCoupon = discountCoupon;
    }
    public isPromotionDiscount(): boolean {
        return this.promotionDiscount == undefined ? false : this.promotionDiscount;
    }

    public setPromotionDiscount(promotionDiscount: boolean): void {
        this.promotionDiscount = promotionDiscount;
    }

    public getPromotionId(): string {
        return this.promotionId;
    }

    public setPromotionId(promotionId: string): void {
        this.promotionId = promotionId;
    }


    public isFixedDiscount(): boolean {
        return this.isFixed;
    }
    public setIsFixed(isFixed: boolean): void {
        this.isFixed = isFixed;
    }
    public getCategoryCustomDiscountItemsList(): Array<CustomDiscountItems> {
        return this.categoryItemsList;
    }
    public setCategoryCustomDiscountItemsList(categoryItemsList: Array<CustomDiscountItems>): void {
        this.categoryItemsList = categoryItemsList;
    }
    public getTagCustomDiscountItemsList(): Array<CustomDiscountItems> {
        return this.tagItemsList;
    }
    public setTagCustomDiscountItemsList(tagItemsList: Array<CustomDiscountItems>): void {
        this.tagItemsList = tagItemsList;
    }
    public getTotalDiscount(): number {
        return this.totalDiscount;
    }

    public setTotalDiscount(totalDiscount: number): void {
        this.totalDiscount = totalDiscount;
    }


    public getDiscoutType(): string {
        return this.discountType;
    }
    public setDiscountType(discountType: string): void {
        this.discountType = discountType;
    }

    public getDiscoutNotes(): string {
        return this.discountNotes;
    }
    public setDiscountNotes(discountNotes: string): void {
        this.discountNotes = discountNotes;
    }

    public getCategory(): Array<CategoryDiscount> {
        return this.category;
    }
    public setCategory(category: Array<CategoryDiscount>): void {
        this.category = category;
    }
  


    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

    public getPercentage(): number {
        return this.percentage;
    }

    public setPercentage(percentage: number): void {
        this.percentage = percentage;
    }

    public getCustomDiscountItemsList(): Array<CustomDiscountItems> {
        return this.items;
    }

    public setCustomDiscountItemsList(items: Array<CustomDiscountItems>): void {
        this.items = items;
    }


    constructor(amount: number, percentage: number) {
        this.amount = amount ? amount : 0;
        this.percentage = percentage ? percentage : 0;
    }

}
export class CustomDiscountItems {
    private itemId: string;
    private itemName: string;
    private amount: number;
    private percentage: number;
    private itemPrice: number;
    private quantity: number;
    private categoryId: string;
    private printerTag: string;
    private dishAddOns: Array<string>;
    private isFixed: boolean;
    private discountNotes: string;
    public getDiscoutNotes(): string {
        return this.discountNotes;
    }
    public setDiscountNotes(discountNotes: string): void {
        this.discountNotes = discountNotes;
    }
    public isFixedDiscount(): boolean {
        return this.isFixed;
    }
    public setIsFixed(isFixed: boolean): void {
        this.isFixed = isFixed;
    }

    public setPrinterTag(printerTag: string): void {
        this.printerTag = printerTag;
    }

    public getPrinterTag(): string {
        return this.printerTag;
    }
    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }
    public getDishAddOns(): Array<string> {
        return this.dishAddOns;
    }

    public setDishAddOns(dishAddOns: Array<string>): void {
        this.dishAddOns = dishAddOns;
    }
    public getQuantity(): number {
        return this.quantity ? this.quantity : 0;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
    public getItemPrice(): number {
        return this.itemPrice ? this.itemPrice : 0;
    }

    public setItemPrice(itemPrice: number): void {
        this.itemPrice = itemPrice;
    }

    public getPercentage(): number {
        return this.percentage ? this.percentage : 0;
    }

    public getAmount(): number {
        return this.amount ? this.amount : 0;
    }

    public getItemName(): string {
        return this.itemName;
    }
    public getItemId(): string {
        return this.itemId;
    }
    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }
    public setPercentage(percentage: number): void {
        this.percentage = percentage;
    }
}
export class CategoryDiscount {
    private amount: number;
    private percentage: number;
    private categoryId: string;
    private itemsTotalPrice: number;
    private isFixed: boolean;
    private items: Array<CustomDiscountItems>;

    public getCustomDiscountItems(): Array<CustomDiscountItems> {
        return this.items;
    }

    public setCustomDiscountItems(items: Array<CustomDiscountItems>): void {
        this.items = items;
    }
    public isFixedDiscount(): boolean {
        return this.isFixed;
    }
    public setIsFixed(isFixed: boolean): void {
        this.isFixed = isFixed;
    }

    public getAmount(): number {
        return this.amount ? this.amount : 0;
    }

    public getItemsTotalPrice(): number {
        return this.itemsTotalPrice ? this.itemsTotalPrice : 0;
    }


    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

    public setItemsTotalPrice(itemsTotalPrice: number): void {
        this.itemsTotalPrice = itemsTotalPrice;
    }

    public getPercentage(): number {
        return this.percentage;
    }

    public setPercentage(percentage: number): void {
        this.percentage = percentage;
    }

}