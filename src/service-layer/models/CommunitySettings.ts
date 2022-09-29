import { Address } from "./Address";
import { ScheduleDays } from "./delivery/ScheduleDays";

export class CommunitySettings {
    private name: string;
    private address: Address;
    private coordinates: [number, number];
    private scheduleDays: Array<ScheduleDays>;

    public getName(): string {
        return this.name;
    }

    public setName(name: string ) {
        this.name = name;
    }

    public getAddress(): Address {
        return this.address;
    }
 
    public setAddress(value: Address) {
        this.address = value;
    }
 
    public getCoordinates(): [number, number] {
        return this.coordinates;
    }
 
    public setCoordinates(value: [number, number]) {
        this.coordinates = value;
    }

    public getScheduleDays(): Array<ScheduleDays>{
        return this.scheduleDays;
    }

    public setScheduleDays(scheduleDays: Array<ScheduleDays>) {
        this.scheduleDays = scheduleDays;
    }

}
