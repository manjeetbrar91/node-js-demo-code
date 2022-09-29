export class MeasurementInfo {
    private abbr: string;
    private measureType: MeasureType;
    private singular: string;
    private plural: string;

    constructor(abbr: string, measureType: MeasureType, singular: string, plural: string) {
        this.abbr = abbr;
        this.measureType = measureType;
        this.singular = singular;
        this.plural = plural;
    }
    public getAbbr(): string {
        return this.abbr;
    }

    public setAbbr(abbr: string): void {
        this.abbr = abbr;
    }

    public getMeasureType(): MeasureType {
        return this.measureType;
    }

    public setMeasureType(measureType: MeasureType): void {
        this.measureType = measureType;
    }

    public getSingular(): string {
        return this.singular;
    }

    public setSingular(singular: string): void {
        this.singular = singular;
    }

    public getPlural(): string {
        return this.plural;
    }

    public setPlural(plural: string): void {
        this.plural = plural;
    }
}

export class MeasurementObserved extends MeasurementInfo {
    private value: number;

    constructor(abbr: string, measureType: MeasureType, singular: string, plural: string, value: number) {
        super(abbr, measureType, singular, plural);
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }
}

export enum MeasureType {
    Mass = "mass",
    Volume = "volume",
    Length = "length",
    Number = "number",
}

export const MassDefaultMetric: string = "kg";
export const VolumeDefaultMetric: string = "l";
export const LengthDefaultMetric: string = "m";
export const NumberDefaultMetric: string = "n";

export const AllowedMassMetrics: Array<string> = ["mg", "g", "kg", "t"];
export const AllowedVolumeMetrics: Array<string> = ["ml", "l", "kl"];
export const AllowedLengthMetrics: Array<string> = ["mm", "cm", "m", "in", "ft"];
export const AllowedNumberMetrics: Array<string> = ["n"];

export const AllowedMetrics = [].concat(AllowedMassMetrics, AllowedVolumeMetrics, AllowedLengthMetrics, AllowedNumberMetrics);