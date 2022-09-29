import { MeasurementObserved } from './Measurements';
import { IngredientInventoryRecord } from './InventoryIngredientRecord';
import { InventoryIngredient } from './InventoryIngredient';

class History {
    private totalQuantity: MeasurementObserved;
    private records: IngredientInventoryRecord[];

    public getTotalQuantity(): MeasurementObserved {
        return this.totalQuantity;
    }

    public setTotalQuantity(totalQuantity: MeasurementObserved
    ): void {
        this.totalQuantity = totalQuantity;
    }

    public getRecords(): IngredientInventoryRecord[] {
        return this.records;
    }

    public setRecords(records: IngredientInventoryRecord[]): void {
        this.records = records;
    }

}

export class IngredientPurchaseHistory extends History {
    private totalAmount: number;

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }

}

export class IngredientManualCorrectionHistory extends History {
}

export class IngredientInventorySummary {
    private ingredient: InventoryIngredient;
    private purchaseHistory: IngredientPurchaseHistory;
    private correctionHistory: IngredientManualCorrectionHistory;

    public getPurchaseHistory(): IngredientPurchaseHistory {
        return this.purchaseHistory;
    }

    public setPurchaseHistory(purchaseHistory: IngredientPurchaseHistory): void {
        this.purchaseHistory = purchaseHistory;
    }

    public getCorrectionHistory(): IngredientManualCorrectionHistory {
        return this.correctionHistory;
    }

    public setCorrectionHistory(correctionHistory: IngredientManualCorrectionHistory): void {
        this.correctionHistory = correctionHistory;
    }

    public getIngredient(): InventoryIngredient {
        return this.ingredient;
    }

    public setIngredient(ingredient: InventoryIngredient): void {
        this.ingredient = ingredient;
    }
}