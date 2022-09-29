import { IsMongoId, IsEnum } from "class-validator";

export enum AccountType {
    Unknown = "unknown",
    RestaurantChain = "restaurantChain",
    DriveIn = "driveIn",
    Restaurant = "restaurant",
    MenewPlatform = "xxxxxxx"
}

export class AccountInfo {
    @IsMongoId()
    private accountId: string;

    @IsEnum(AccountType)
    private accountType: AccountType;

    constructor(accountId: string, accountType: AccountType) {
        this.accountId = accountId;
        this.accountType = accountType;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getAccountType(): AccountType {
        return this.accountType;
    }

    public setAccountType(accountType: AccountType): void {
        this.accountType = accountType;
    }

    public isValid(): boolean {
        return this.accountId != undefined &&
            this.accountType != undefined;
    }
}