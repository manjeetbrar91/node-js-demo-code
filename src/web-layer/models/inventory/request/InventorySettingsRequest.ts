import { InventoryPriceCalculationMode } from "../../../../service-layer/models/InventorySettings";

export class InventorySettingsRequest {
     priceCalculation: InventoryPriceCalculationMode;
     storeForceAdjustment: boolean;
     costCenterForceAdjustment: boolean;
     autoTransferToCostCenter: boolean;
     autoTransferToCostCenterId: string;

}

