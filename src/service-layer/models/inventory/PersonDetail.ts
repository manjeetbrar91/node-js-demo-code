import { User } from "../User";

export class PersonDetail extends User{
    private designation: string; 

    public getDesignation(): string {
        return this.designation;
    }

    public setDesignation(designation: string): void {
        this.designation = designation;
    }
}