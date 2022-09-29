import { ExtendedTypeValue } from './extendedtypes/ExtendedType';

export class AvailabilitySchedule {
    private dayOfWeek: ExtendedTypeValue; // Refers to MenuDishAvailabilityDayExtendedType
    private start: number; // 1:16PM means 13*60 + 16 = 796th minute of the day
    private end: number; // 1:20PM means 13*60 + 20 = 800th minute of the day

    public getDayOfWeek(): ExtendedTypeValue {
        return this.dayOfWeek;
    }

    public setDayOfWeek(dayOfWeek: ExtendedTypeValue): void {
        this.dayOfWeek = dayOfWeek;
    }
    public getEnd(): number {
        return this.end;
    }

    public setEnd(end: number): void {
        this.end = end;
    }
    public getStart(): number {
        return this.start;
    }

    public setStart(start: number): void {
        this.start = start;
    }
}