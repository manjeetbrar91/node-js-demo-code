import { IInventoryStoreStockClosingDBManager } from "../../../db-layer/interfaces/inventory/IInventoryStoreStockClosingDBManager";
import { IInventoryStockClosingService } from "../../../service-layer/interfaces/inventory/IInventoryStockClosingService";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { InventoryStoreStockClosingModel } from "../../../service-layer/models/inventory/InventoryStoreStockClosingModel";
import { months } from "moment";
import { Utility } from "../../../common/utils/Utility";
import { InventoryStockIssueReportModel } from "../../../web-layer/models/inventory/request/InventoryStockIssueReportModel";
import { InventoryStockClosingReportResponse } from "../../../service-layer/models/inventory/InventoryStockClosingReportResponse";

export class InventoryStockClosingService implements IInventoryStockClosingService {
  private readonly dbManager: IInventoryStoreStockClosingDBManager;

  constructor() {
    this.dbManager = DBManagerFactory.getInventoryStoreStockClosingDBManager();
  }


  public async getAllStockClosingReprot(params: InventoryStockIssueReportModel): Promise<InventoryStockClosingReportResponse> {
    return await this.dbManager.getAllStockClosingReprot(params);
  }

  public async generateStockClosingByRestaurantId(date: string, restaurantId: string): Promise<boolean> {
    let id = restaurantId;
    console.log(id, "idiiii");

    var isExists = await this.dbManager.isClosingExists(date, (id));
    if (isExists) {
      let stockClosingIdList = await this.dbManager.stockClosingIdListByDate(date, restaurantId)
      if (stockClosingIdList.length > 0) {
        await this.dbManager.deleteStockClosingByIdList(stockClosingIdList, restaurantId);
      }
    }
    await this.createClosingExists(date.toString(), restaurantId);
    // if (isExists == false) {
    //   await this.createClosingExists(date.toString(), restaurantId);
    // }

    return true;

  }
  public async isClosingExists(date: string, restaurantId: string): Promise<boolean> {

    return false;
  }
  public async createClosingExists(date: string, restaurantId: string): Promise<boolean> {

    // let variantArray = await this.itemDB.getItemVariantsByRestaurantId(restaurantId);
    // let stockClosingArray = new Array<InventoryStoreStockClosingModel>();
    // for (let variant of variantArray) {
    //   let model = new InventoryStoreStockClosingModel();

    //   model.setRestaurantId(variant.getRestaurantId());
    //   model.setVariantId(variant.getId());
    //   model.setItemId(variant.getItemId());
    //   model.setUnitId(variant.getUnitId());


    //   model.setVariantAveragePrice((variant.getAveragePricePerQty() > 0 ? variant.getAveragePricePerQty() : variant.getLatestPricePerQty()))
    //   model.setVariantLatestPrice(variant.getLatestPricePerQty());
    //   model.setVariantCurrentStockQTY(variant.getCurrentStockQTY())
    //   model.setVariantQTY(variant.getVariantQTY())
    //   model.setVariantQTYUnit(variant.getVariantQTYUnit())


    //   if (variant.getCurrentStock()) {
    //     let stock = variant.getCurrentStock();
    //     model.setAveragePrice((stock.getAveragePrice() != undefined && stock.getAveragePrice() > 0) ? stock.getAveragePrice() : stock.getPriceQtyUnit())
    //     model.setPriceQtyUnit(stock.getPriceQtyUnit())
    //     model.setQty(stock.getQty())
    //     model.setQtyUnit(stock.getQtyUnit())
    //   } else {
    //     model.setAveragePrice(0);
    //     model.setQtyUnit("");
    //     model.setPriceQtyUnit(0);
    //     model.setQty(0);

    //   }
    //   model.setClosingDate(date);
    //   stockClosingArray.push(model);

    // }

    // if (stockClosingArray.length > 0) {
    //   await this.dbManager.addClosing(stockClosingArray);
    // }
    return true;
  }


}