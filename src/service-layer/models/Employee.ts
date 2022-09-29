import { User, UserType } from './User';

export class Employee extends User {

    private userName: string;
    private password: string;
    //private accountInfo: AccountInfo;
    // duplicate information but need to remove in future
    public accountId: string;
    public accountType: string;
    public landingPage: string;
    public channelPage: string;
    private assignedTables: Array<string>;
    private defaultRestaurant: string;

    constructor() {
        super(UserType.Employee);
    }
    
    public getDefaultRestaurant(): string {
        return this.defaultRestaurant;
    }

    public setDefaultRestaurant(defaultRestaurant: string): void {
        this.defaultRestaurant = defaultRestaurant;
    }

    public getUserName(): string {
        return this.userName;
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getChannelPage(): string {
        return this.channelPage;
    }

    public setChannelPage(page: string): void {
        this.channelPage = page;
    }

    public getLandingPage(): string {
        return this.landingPage;
    }

    public setLandingPage(page: string): void {
        this.landingPage = page;
    }

    public setAssignedTables(tables: Array<string>): void {
        this.assignedTables = tables;
    }

    public getAssignedTables(): Array<string> {
        return this.assignedTables;
    }

    // public getAccountInfo(): AccountInfo {
    //     return this.accountInfo;
    // }

    // public setAccountInfo(accountInfo: AccountInfo): void {
    //     this.accountInfo = accountInfo;
    //     this.accountId = accountInfo.getAccountId();
    //     this.accountType = accountInfo.getAccountType();
    // }
}

