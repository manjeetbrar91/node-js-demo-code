import { IsMongoId } from 'class-validator';

export class InventoryCostCenterConsumtionRequest {

  

    restaurantId: string;

    startDate: Date;
    endDate: Date;
}