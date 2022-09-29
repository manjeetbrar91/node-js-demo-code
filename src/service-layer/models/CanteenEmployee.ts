import { ServiceObject } from './ServiceObject';
export enum CanteenUserType {
    Officer = "officer",
    Visitor = "visitor",
    CanteenManager = "canteenmanager",
}

export class CanteenEmployee extends ServiceObject {
    private accountId: string;
    private accountType: string;
    private roleType: CanteenUserType;
    private employeeId: string;
    private roomNumber: string;

    public getRoleType(): CanteenUserType {
        return this.roleType;
    }

    public setRoleType(roleType: CanteenUserType): void {
        this.roleType = roleType;
    }

    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getRoomNumber(): string {
        return this.roomNumber;
    }

    public setRoomNumber(roomNumber: string): void {
        this.roomNumber = roomNumber;
    }

    /**
     * Getter $accountType
     * @return {string}
     */
    public getAccountType(): string {
        return this.accountType;
    }

    /**
     * Setter $accountType
     * @param {string} value
     */
    public setAccountType(value: string) {
        this.accountType = value;
    }

    /**
     * Getter $accountId
     * @return {string}
     */
    public getAccountId(): string {
        return this.accountId;
    }

    /**
     * Setter $accountId
     * @param {string} value
     */
    public setAccountId(value: string) {
        this.accountId = value;
    }

}

