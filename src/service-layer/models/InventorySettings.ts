
export class InventorySettings {
    // Inventory settings for restaurant
    private priceCalculation: InventoryPriceCalculationMode;
    private storeForceAdjustment: boolean;
    private costCenterForceAdjustment: boolean;
    private autoTransferToCostCenter: boolean;
    private autoTransferToCostCenterId: string;

    public isAutoTransferToCostCenter(): boolean {
        return this.autoTransferToCostCenter;
    }

    public setAutoTransferToCostCenter(autoTransferToCostCenter: boolean): void {
        this.autoTransferToCostCenter = autoTransferToCostCenter;
    }

    public getAutoTransferToCostCenterId(): string {
        return this.autoTransferToCostCenterId;
    }

    public setAutoTransferToCostCenterId(autoTransferToCostCenterId: string): void {
        this.autoTransferToCostCenterId = autoTransferToCostCenterId;
    }




    public isStoreForceAdjustment(): boolean {
        return this.storeForceAdjustment;
    }

    public setStoreForceAdjustment(storeForceAdjustment: boolean): void {
        this.storeForceAdjustment = storeForceAdjustment;
    }

    public isCostCenterForceAdjustment(): boolean {
        return this.costCenterForceAdjustment;
    }

    public setCostCenterForceAdjustment(costCenterForceAdjustment: boolean): void {
        this.costCenterForceAdjustment = costCenterForceAdjustment;
    }

    public getPriceCalculation(): InventoryPriceCalculationMode {
        return this.priceCalculation;
    }

    public setPriceCalculation(priceCalculation: InventoryPriceCalculationMode): void {
        this.priceCalculation = priceCalculation;
    }

}

export enum InventoryPriceCalculationMode {
    Average = "average",
    Latest = "latest"
}