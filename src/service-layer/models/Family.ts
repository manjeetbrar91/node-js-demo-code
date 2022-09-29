// TODO remove later
import { FamilyAssociation } from "./FamilyAssociation";

export class Family {

    private id: string;
    private name: string;
    private sequenceNumber: number;
    private weight: number;
    private createdTS: string;
    private updatedTS: string;
    private accountId: string;
    private associations: Array<FamilyAssociation>;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getSequenceNumber(): number {
        return this.sequenceNumber;
    }

    public setSequenceNumber(sequenceNumber: number): void {
        this.sequenceNumber = sequenceNumber;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public getAssociations(): Array<FamilyAssociation> {
        return this.associations;
    }

    public setAssociations(associations: Array<FamilyAssociation>): void {
        this.associations = associations;
    }

    public getCreatedTS(): string {
        return this.createdTS;
    }

    public setCreatedTS(createdTS: string): void {
        this.createdTS = createdTS;
    }

    public getUpdatedTS(): string {
        return this.updatedTS;
    }

    public setUpdatedTS(updatedTS: string): void {
        this.updatedTS = updatedTS;
    }
}

