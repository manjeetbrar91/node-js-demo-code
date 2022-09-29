import { ServiceObject } from './ServiceObject';
import { AccountInfo } from './AccountInfo';
import { Address } from './Address';
// each role have defined permissions.
// And in every action server we check if user is allowed to do that
// based on assigned roles.
export enum UserRole {
    DEFAULT = "default",
    Unknown = "unknown",
    MenewAdmin = "menewAdmin",
    Waiter = "waiter",
    Owner = "owner",
    Chef = "chef",
    Manager = "manager",
    Cashier = "cashier",
    CustomerAdmin = "customerAdmin",
    RestaurantOwner = "restaurantOwner",
    ChainOwner = "chainOwner",
    Captain = "captain",
    FNBController = "fnbController",
    CustomerContributor = "customerContributor",
    CloudKitchenOwner = "cloudKitchenOwner",
    StoreManager = "StoreManager",
}

export enum RolePermissions {
    Dashboard = 1,
    OrderManagement = 2,
    Promotions = 3,
    Menu = 4,
    Users = 5,
    Inventory = 6,
    Reports = 7,
    Customers = 8,
    Loyalty = 9,
    Settings = 10,
    EditOrder = 11,
    CloseOrder = 12,
    ChangeTable = 13,
    DeleteOrder = 14,
    GenerateBill = 15,
    GiveDiscount = 16,
    PrintKOT = 17,
    DineIn = 18,
    Online = 19,
    Partner = 20,
    EndSession = 21,
    KitchenDisplay = 22,
    Messages = 23,
    Theatre = 24,
    SendBill = 25
}

export enum PermissionType {
    Dashboard = "dashboard",
    OrderManagement = "ordermanagement",
    Promotions = "promotions",
    Menu = "menu",
    Users = "users",
    Inventory = "inventory",
    Reports = "reports",
    Customers = "customers",
    Loyalty = "loyalty",
    Settings = "settings",
    EditOrder = "editorder",
    CloseOrder = "closeorder",
    ChangeTable = "changetable",
    DeleteOrder = "deleteorder",
    GenerateBill = "generatebill",
    GiveDiscount = "givediscount",
    PrintKOT = "printkot",
    DineIn = "dinein",
    Online = "online",
    Partner = "partner",
    EndSession = "endsession",
    KitchenDisplay = "kitchendisplay",
    Messages = "messages",
    Theatre = "theatre",
    SendBill = "sendBill",
    Unknown = "unknown",
    PaymentResettle = "PaymentResettle",
    CancelMultipleOrder = "CancelMultipleOrder"
}

export enum UserType {
    Unknown = "unknown",
    Employee = "employee",
    Vendor = "vendor",
    Customer = "customer",
}

export class UserFoodPreferences {
    private vegPreference: string;
    private cuisinePreference: string[];

    public getVegPreference(): string {
        return this.vegPreference;
    }

    public setVegPreference(vegPreference: string): void {
        this.vegPreference = vegPreference;
    }

    public getCuisinePreference(): string[] {
        return this.cuisinePreference;
    }

    public setCuisinePreference(cuisinePreference: string[]): void {
        this.cuisinePreference = cuisinePreference;
    }
}

export class SavedAddress {
    private address: Address;
    private addressType: string;
    private coordinates: [number, number];

    public getCoordinates(): [number, number] {
        return this.coordinates;
    }

    public setCoordinates(coordinates: [number, number]): void {
        this.coordinates = coordinates;
    }

    public getAddress(): Address {
        return this.address;
    }

    public setAddress(address: Address): void {
        this.address = address;
    }

    public getAddressType(): string {
        return this.addressType;
    }

    public setAddressType(addressType: string): void {
        this.addressType = addressType;
    }
}

export abstract class User extends ServiceObject {
    private phoneNumber: number;
    private firstName: string;
    private lastName: string;
    public otp: number;
    public otpCreatedAt: number;

    // a user can multiple roles based on requirement
    private roles: Array<UserRole>;

    // date when user last visited
    private lastVisit: Date;

    private userType: UserType;
    private roleId: string;
    private accountInfo: AccountInfo;
    private email: string;
    private address: SavedAddress[];
    private birthdayDate: Date;
    private anniversaryDate: Date;
    private preferences: UserFoodPreferences;
    private sendMessage: boolean;

    constructor(userType: UserType) {
        super();
        this.userType = userType;
        this.roles = new Array<UserRole>();
        this.lastVisit = new Date();
    }

    public getBirthdayDate(): Date {
        return this.birthdayDate;
    }

    public setBirthdayDate(birthdayDate: Date): void {
        this.birthdayDate = birthdayDate;
    }

    public getAnniversaryDate(): Date {
        return this.anniversaryDate;
    }

    public setAnniversaryDate(anniversaryDate: Date): void {
        this.anniversaryDate = anniversaryDate;
    }

    public getPreferences(): UserFoodPreferences {
        return this.preferences;
    }

    public setPreferences(preferences: UserFoodPreferences): void {
        this.preferences = preferences;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAddress(): SavedAddress[] {
        return this.address;
    }

    public setAddress(address: SavedAddress[]): void {
        this.address = address;
    }

    public getAccountInfo(): AccountInfo {
        return this.accountInfo;
    }

    public setAccountInfo(accountInfo: AccountInfo): void {
        this.accountInfo = accountInfo;
    }

    public getRoleId(): string {
        return this.roleId;
    }

    public setRoleId(roleId: string): void {
        this.roleId = roleId;
    }

    public getUserType(): UserType {
        return this.userType
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: number): void {
        this.phoneNumber = phoneNumber;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getLastVisit(): Date {
        return this.lastVisit;
    }

    public setLastVisit(lastVisit: Date): void {
        this.lastVisit = lastVisit;
    }

    public getRoles(): Array<UserRole> {
        return this.roles;
    }

    public setRoles(roles: Array<UserRole>): void {
        this.roles = roles;
    }

    public addRole(role: UserRole): void {
        this.roles.push(role);
    }

    public setSendMessage(sendMessage: boolean): void {
        this.sendMessage = sendMessage;
    }

    public getSendMessage(): boolean {
        return this.sendMessage;
    }

    public getOtp(): number {
        return this.otp;
    }

    public setOtp(otp: number): void {
        this.otp = otp;
    }

    public getOtpCreatedAt(): number {
        return this.otpCreatedAt;
    }

    public setOtpCreatedAt(otpCreatedAt: number): void {
        this.otpCreatedAt = otpCreatedAt;
    }
}
