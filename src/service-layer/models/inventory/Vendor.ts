import { Address } from "../Address";
import { OrderPayment } from "../OrderPayment";
import { ServiceObject } from "../ServiceObject";
import { PersonDetail } from "./PersonDetail";
import { InventoryCategories } from "./StoreCategories";

export class Vendor extends ServiceObject {
    private restaurantId: string;
    private name: string;
    private email: string;
    private phoneNumber1: string;
    private phoneNumber2: string;
    private category: Array<InventoryCategories>;
    private categoryId: Array<string>;
    private gstNumber: string;
    private address: Address;
    private payments: Array<OrderPayment>;
    private purchaseActive: boolean;
    private createdBy: string;
    private contactPersonDetails: Array<PersonDetail>;
    private orderTotalAmount: number;
    private totalOrders: number;
    private bankName: string;
    private bankBranchName: string;
    private bankIFSC: string;
    private bankAccountNumber: string;

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

    public getBankAccountNumber(): string {
        return this.bankAccountNumber;
    }

    public setBankAccountNumber(bankAccountNumber: string): void {
        this.bankAccountNumber = bankAccountNumber;
    }

    public getOrderTotalAmount(): number {
        return this.orderTotalAmount;
    }

    public setOrderTotalAmount(orderTotalAmount: number): void {
        this.orderTotalAmount = orderTotalAmount;
    }

    public getTotalOrders(): number {
        return this.totalOrders;
    }

    public setTotalOrders(totalOrders: number): void {
        this.totalOrders = totalOrders;
    }



    public getCategoryId(): Array<string> {
        return this.categoryId;
    }

    public setCategoryId(categoryId: Array<string>): void {
        this.categoryId = categoryId;
    }
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }
    public getCategory(): Array<InventoryCategories> {
        return this.category;
    }

    public setCategory(category: Array<InventoryCategories>): void {
        this.category = category;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPhoneNumber1(): string {
        return this.phoneNumber1;
    }

    public setPhoneNumber1(phoneNumber1: string): void {
        this.phoneNumber1 = phoneNumber1;
    }

    public getPhoneNumber2(): string {
        return this.phoneNumber2;
    }

    public setPhoneNumber2(phoneNumber2: string): void {
        this.phoneNumber2 = phoneNumber2;
    }

    public getGstNumber(): string {
        return this.gstNumber;
    }

    public setGstNumber(gstNumber: string): void {
        this.gstNumber = gstNumber;
    }

    public getAddress(): Address {
        return this.address;
    }

    public setAddress(address: Address): void {
        this.address = address;
    }

    public getPayments(): Array<OrderPayment> {
        return this.payments;
    }

    public setPayments(payments: Array<OrderPayment>): void {
        this.payments = payments;
    }

    public isPurchaseActive(): boolean {
        return this.purchaseActive;
    }

    public setPurchaseActive(purchaseActive: boolean): void {
        this.purchaseActive = purchaseActive;
    }

    public getCreatedBy(): string {
        return this.createdBy;
    }

    public setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy;
    }

    public getContactPersonDetails(): Array<PersonDetail> {
        return this.contactPersonDetails;
    }

    public setContactPersonDetails(contactPersonDetails: Array<PersonDetail>): void {
        this.contactPersonDetails = contactPersonDetails;
    }
}