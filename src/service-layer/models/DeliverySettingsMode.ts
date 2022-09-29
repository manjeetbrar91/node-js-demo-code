export class DeliverySettingsMode {
    private mode: Mode;
    private enabled: boolean;
    private timeSlots: Array<TimeSlot>; 

    public getEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(value: boolean) {
        this.enabled = value;
    }

    public getMode(): Mode {
        return this.mode;
    }

    public setMode(value: Mode) {
        this.mode = value;
    }

    public getTimeSlots(): Array<TimeSlot> {
        return this.timeSlots;
    }
 
    public setTimeSlots(value: Array<TimeSlot>) {
        this.timeSlots = value;
    }

}

export class TimeSlot {
    private from: number;
    private to: number;

    public getTo(): number {
        return this.to;
    }

    public setTo(value: number) {
        this.to = value;
    }

    public getFrom(): number {
        return this.from;
    }

    public setFrom(value: number) {
        this.from = value;
    }
}

export enum Mode {
    HomeDelivery = "homeDelivery",
    Swiggy = "swiggy",
    Zomato = "zomato",
}