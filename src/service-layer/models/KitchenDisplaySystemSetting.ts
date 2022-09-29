export class KitchenDisplaySystem {
    // socialLinks  for restaurant
    private minThreshold: string;
    private maxThreshold: string;

    public getMinThreshold(): string {
        return this.minThreshold;
    }

    public setMinThreshold(minThreshold: string): void {
        this.minThreshold = minThreshold;
    }

    public getMaxThreshold(): string {
        return this.maxThreshold;
    }

    public setMaxThreshold(maxThreshold: string): void {
        this.maxThreshold = maxThreshold;
    }
}