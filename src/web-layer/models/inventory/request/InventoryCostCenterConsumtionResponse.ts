import { CategoryBasedProductDetails } from '../../../../service-layer/models/reports/TagBasedProductDetails';
import { InventoryCostCenterCategoryConsumptionModel } from './InventoryCostCenterCategoryConsumptionModel';
import { InventoryCostCenterConsumptionOrderItemModel } from './InventoryCostCenterConsumptionOrderItemModel';

export class InventoryCostCenterConsumtionResponse {

    private grossSale:number;
    private inventoryCost:number;
    private netRevenue:number;
    private costPercentage:number;
    private posCategoryData:Array<CategoryBasedProductDetails>;
    private inventoryCategoryData:Array<InventoryCostCenterCategoryConsumptionModel>;
    private posItemsCost:Array<InventoryCostCenterConsumptionOrderItemModel>;

    public getPosItemsCost(): Array<InventoryCostCenterConsumptionOrderItemModel> {
        return this.posItemsCost;
    }

    public setPosItemsCost(posItemsCost: Array<InventoryCostCenterConsumptionOrderItemModel>): void {
        this.posItemsCost = posItemsCost;
    }


    public getGrossSale(): number {
        return this.grossSale;
    }

    public setGrossSale(grossSale: number): void {
        this.grossSale = grossSale;
    }

    public getInventoryCost(): number {
        return this.inventoryCost;
    }

    public setInventoryCost(inventoryCost: number): void {
        this.inventoryCost = inventoryCost;
    }

    public getNetRevenue(): number {
        return this.netRevenue;
    }

    public setNetRevenue(netRevenue: number): void {
        this.netRevenue = netRevenue;
    }

    public getCostPercentage(): number {
        return this.costPercentage;
    }

    public setCostPercentage(costPercentage: number): void {
        this.costPercentage = costPercentage;
    }

    public getPosCategoryData(): Array<CategoryBasedProductDetails> {
        return this.posCategoryData;
    }

    public setPosCategoryData(posCategoryData: Array<CategoryBasedProductDetails>): void {
        this.posCategoryData = posCategoryData;
    }

    public getInventoryCategoryData(): Array<InventoryCostCenterCategoryConsumptionModel> {
        return this.inventoryCategoryData;
    }

    public setInventoryCategoryData(inventoryCategoryData: Array<InventoryCostCenterCategoryConsumptionModel>): void {
        this.inventoryCategoryData = inventoryCategoryData;
    }



}