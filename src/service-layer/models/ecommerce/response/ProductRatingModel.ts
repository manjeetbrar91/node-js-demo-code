import { ServiceObject } from "../../ServiceObject";

export class ProductRatingModel extends ServiceObject {
    private poor: number;
    private average: number;
    private good: number;
    private veryGood: number;
    private excellent: number;
    constructor() {
        super();
        this.poor = 0;
        this.average = 0;
        this.good = 0;
        this.veryGood = 0;
        this.excellent = 0;
    }
    public getPoor(): number {
        return this.poor;
    }

    public setPoor(poor: number): void {
        this.poor = poor;
    }

    public getAverage(): number {
        return this.average;
    }

    public setAverage(average: number): void {
        this.average = average;
    }

    public getGood(): number {
        return this.good;
    }

    public setGood(good: number): void {
        this.good = good;
    }

    public getVeryGood(): number {
        return this.veryGood;
    }

    public setVeryGood(veryGood: number): void {
        this.veryGood = veryGood;
    }

    public getExcellent(): number {
        return this.excellent;
    }

    public setExcellent(excellent: number): void {
        this.excellent = excellent;
    }


}

export enum ProductRatingEnum {
    Poor = "Poor",
    Average = "Average",
    Good = "Good",
    VeryGood = "Very Good",
    Excellent = "Excellent",
}

