import { ChannelStatus } from "./RestaurantCustomerOrder";

export class OrderHistory {
    private billNumber: string;
    private customerName: string;
    private mobileNumber: string;
    private billAmount: number;
    private discount: string;
    private discountReason: string;
    private gstAmount: number;
    private section: number;
    private tableNumber: number;
    private payment: string[];
    private waiterName: string;
    private cashierName: string;
    private channel: string;
    private id: string;
    private itemsCount: number;
    private date: string;
    private time: string;
    private subTotalAmount: number;
    private feedbackSelectedOptions: Array<string>;
    private comment: string;
    private netRevenue: number;
    private grossRevenue: number;
    private serviceCharge: number;
    private collectedTips: number;
    private roundOffValue: number;
    private packingCharges: number;
    private deliveryCharges: number;
    private gstName: string;
    private gstNumber: string;
    private creditAgainst: string;
    private channelOrderStatus: ChannelStatus;
    private paymentStatus: string;
    private cancellationReason: string;
    private status: string;
    private IFHCharges: number;
    private cessCharges: number;
    private reportTagHisotry: ReportTagHistory[];
    private taxHistory: ReportTagTaxHistory[];
    private mainDiscountType: string;
    private numberOfPeople: string;
    private kids: string;
    private paxCount: string;
    private itemsCountHistory: ReportItemsCount[];
    private tableSectionCharges: number;
    private tableSectionChargesValue: number;
    private paymentWithAmount: any[];
    private aggregatorPaidTax: number;
    private createdFrom: string;    
    private onlinePayment: boolean;
    private partnerType: string;    

    public getPartnerType(): string {
        return this.partnerType;
    }

    public setPartnerType(partnerType: string): void {
        this.partnerType = partnerType;
    }


    public getCreatedFrom(): string {
        return this.createdFrom;
    }

    public setCreatedFrom(createdFrom: string): void {
        this.createdFrom = createdFrom;
    }

    public isOnlinePayment(): boolean {
        return this.onlinePayment;
    }

    public setOnlinePayment(onlinePayment: boolean): void {
        this.onlinePayment = onlinePayment;
    }



    public getAggregatorPaidTax(): number {
        return this.aggregatorPaidTax;
    }

    public setAggregatorPaidTax(aggregatorPaidTax: number): void {
        this.aggregatorPaidTax = aggregatorPaidTax;
    }

    
    public getPaymentWithAmount(): any[] {
        return this.paymentWithAmount;
    }

    public setPaymentWithAmount(paymentWithAmount: any[]): void {
        this.paymentWithAmount = paymentWithAmount;
    }


     

    
    public getTableSectionChargesValue(): number {
        return this.tableSectionChargesValue;
    }
    
    public setTableSectionChargesValue(tableSectionChargesValue: number): void {
        this.tableSectionChargesValue = tableSectionChargesValue;
    }
    
    private tableSectionChargesInPercentage: boolean;
    
    public isTableSectionChargesInPercentage(): boolean {
        return this.tableSectionChargesInPercentage;
    }
    
    public setTableSectionChargesInPercentage(tableSectionChargesInPercentage: boolean): void {
        this.tableSectionChargesInPercentage = tableSectionChargesInPercentage;
    }


    public getTableSectionCharges(): number {
        return this.tableSectionCharges;
    }

    public setTableSectionCharges(tableSectionCharges: number): void {
        this.tableSectionCharges = tableSectionCharges;
    }


    public getItemsCountHistory(): ReportItemsCount[] {
        return this.itemsCountHistory ? this.itemsCountHistory : [];
    }

    public setItemsCountHistory(itemsCountHistory: ReportItemsCount[]): void {
        this.itemsCountHistory = itemsCountHistory;
    }


    public getPaxCount(): string {
        return this.paxCount;
    }

    public setPaxCount(paxCount: string): void {
        this.paxCount = paxCount;
    }


    public getNumberOfPeople(): string {
        return this.numberOfPeople;
    }

    public setNumberOfPeople(numberOfPeople: string): void {
        this.numberOfPeople = numberOfPeople;
    }

    public getKids(): string {
        return this.kids;
    }

    public setKids(kids: string): void {
        this.kids = kids;
    }


    public getMainDiscountType(): string {
        return this.mainDiscountType;
    }

    public setMainDiscountType(mainDiscountType: string): void {
        this.mainDiscountType = mainDiscountType;
    }


    public getReportTagHisotry(): ReportTagHistory[] {
        return this.reportTagHisotry;
    }

    public setReportTagHisotry(reportTagHisotry: ReportTagHistory[]): void {
        this.reportTagHisotry = reportTagHisotry;
    }

    public getTaxHistory(): ReportTagTaxHistory[] {
        return this.taxHistory;
    }

    public setTaxHistory(taxHistory: ReportTagTaxHistory[]): void {
        this.taxHistory = taxHistory;
    }


    public getCessCharges(): number {
        return this.cessCharges;
    }

    public setCessCharges(CessCharges: number): void {
        this.cessCharges = CessCharges;
    }

    public getIFHCharges(): number {
        return this.IFHCharges;
    }

    public setIFHCharges(IFHCharges: number): void {
        this.IFHCharges = IFHCharges;
    }

    public getCancellationReason(): string {
        return this.cancellationReason;
    }

    public setCancellationReason(cancellationReason: string): void {
        this.cancellationReason = cancellationReason;
    }

    public getCreditAgainst(): string {
        return this.creditAgainst;
    }

    public setCreditAgainst(creditAgainst: string): void {
        this.creditAgainst = creditAgainst;
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

    public getPackingCharges(): number {
        return this.packingCharges;
    }

    public setPackingCharges(value: number) {
        this.packingCharges = value;
    }

    public getDeliveryCharges(): number {
        return this.deliveryCharges;
    }

    public setDeliveryCharges(value: number) {
        this.deliveryCharges = value;
    }

    public getRoundOffValue(): number {
        return this.roundOffValue;
    }

    public setRoundOffValue(value: number) {
        this.roundOffValue = value;
    }

    public getCollectedTips(): number {
        return this.collectedTips;
    }

    public setCollectedTips(value: number) {
        this.collectedTips = value;
    }

    public getServiceCharge(): number {
        return this.serviceCharge;
    }

    public setServiceCharge(value: number) {
        this.serviceCharge = value;
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

    public getFeedbackSelectedOptions(): Array<string> {
        return this.feedbackSelectedOptions;
    }

    public setFeedbackSelectedOptions(feedbackSelectedOptions: Array<string>): void {
        this.feedbackSelectedOptions = feedbackSelectedOptions;
    }

    public getComment(): string {
        return this.comment;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public getSubTotalAmount(): number {
        return this.subTotalAmount;
    }

    public setSubTotalAmount(subTotalAmount: number): void {
        this.subTotalAmount = Number(subTotalAmount.toFixed(2));
    }

    public getDate(): string {
        return this.date;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    public getTime(): string {
        return this.time;
    }

    public setTime(time: string): void {
        this.time = time;
    }

    public getItemsCount(): number {
        return this.itemsCount;
    }

    public setItemsCount(itemsCount: number): void {
        this.itemsCount = itemsCount;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getBillNumber(): string {
        return this.billNumber;
    }

    public setBillNumber(billNumber: string): void {
        this.billNumber = billNumber;
    }

    public getCustomerName(): string {
        return this.customerName;
    }

    public setCustomerName(customerName: string): void {
        this.customerName = customerName;
    }

    public getMobileNumber(): string {
        return this.mobileNumber;
    }

    public setMobileNumber(mobileNumber: string): void {
        this.mobileNumber = mobileNumber;
    }

    public getBillAmount(): number {
        return this.billAmount;
    }

    public setBillAmount(billAmount: number): void {
        this.billAmount = Number(billAmount.toFixed(2));
    }

    public getDiscount(): string {
        return this.discount;
    }

    public setDiscount(discount: string): void {
        this.discount = discount;
    }

    public getDiscountReason(): string {
        return this.discountReason;
    }

    public setDiscountReason(discountReason: string): void {
        this.discountReason = discountReason;
    }

    public getGstAmount(): number {
        return this.gstAmount;
    }

    public setGstAmount(gstAmount: number): void {
        this.gstAmount = Number(gstAmount.toFixed(2));
    }

    public getSection(): number {
        return this.section;
    }

    public setSection(section: number): void {
        this.section = section;
    }

    public getTableNumber(): number {
        return this.tableNumber;
    }

    public setTableNumber(tableNumber: number): void {
        this.tableNumber = tableNumber;
    }

    public getPayment(): string[] {
        return this.payment;
    }

    public setPayment(payment: string[]): void {
        this.payment = payment;
    }

    public getWaiterName(): string {
        return this.waiterName;
    }

    public setWaiterName(waiterName: string): void {
        this.waiterName = waiterName;
    }

    public getCashierName(): string {
        return this.cashierName;
    }

    public setCashierName(cashierName: string): void {
        this.cashierName = cashierName;
    }

    public getChannel(): string {
        return this.channel;
    }

    public setChannel(channel: string): void {
        this.channel = channel;
    }

    public getChannelOrderStatus(): ChannelStatus {
        return this.channelOrderStatus;
    }

    public setChannelOrderStatus(channelOrderStatus: ChannelStatus): void {
        this.channelOrderStatus = channelOrderStatus;
    }

    public getPaymentStatus(): string {
        return this.paymentStatus;
    }

    public setPaymentStatus(paymentStatus: string): void {
        this.paymentStatus = paymentStatus;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string) {
        this.status = status;
    }
}

export class ReportTagHistory {
    private reportTag: string;
    private subTotal: number;
    private discount: number;
    private taxableAmount: number;



    public getReportTag(): string {
        return this.reportTag;
    }

    public setReportTag(reportTag: string): void {
        this.reportTag = reportTag;
    }

    public getSubTotal(): number {
        return this.subTotal;
    }

    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }

    public getDiscount(): number {
        return this.discount;
    }

    public setDiscount(discount: number): void {
        this.discount = discount;
    }

    public getTaxableAmount(): number {
        return this.taxableAmount;
    }

    public setTaxableAmount(taxableAmount: number): void {
        this.taxableAmount = taxableAmount;
    }


}

export class ReportItemsCount {
    private itemName: string;
    private itemId: string;
    private quantity: string;
    private amount: number;

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getQuantity(): string {
        return this.quantity;
    }

    public setQuantity(quantity: string): void {
        this.quantity = quantity;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }


}
export class ReportTagTaxHistory {
    private title: string;
    private value: number;
    private amount: number;


    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }


}