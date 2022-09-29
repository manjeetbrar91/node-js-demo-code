import { ObjectStatus } from "./ObjectStatus";

export class DailySummaryContacts {
    private name: string;
    private email: string;
    private phoneNumber: string;
    private enable: boolean;
    private status: ObjectStatus;

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public setEnable(enable: boolean): void {
        this.enable = enable;
    }

    public getStatus(): ObjectStatus {
        return this.status;
    }

    public setStatus(status: ObjectStatus): void {
        this.status = status;
    }
}