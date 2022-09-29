import { BillOrderItem } from "./BillOrderItem";

export class KOTOrderItem extends BillOrderItem{
    private preferences: Array<string>;

    constructor(billOrderItem: BillOrderItem) {
        super();
        this.setName(billOrderItem.getName());
        this.setItemId(billOrderItem.getItemId());
        this.setDishAddOns(billOrderItem.getDishAddOns());
        this.setDishType(billOrderItem.getDishType());
        this.setPrice(billOrderItem.getPrice());
        this.setPrintTag(billOrderItem.getPrintTag());
        this.setQuantity(billOrderItem.getQuantity());
        this.setPreviousQuantity(billOrderItem.getPreviousQuantity());
        this.setSpecialRequest(billOrderItem.getSpecialRequest());
        this.setTransferRemarks(billOrderItem.getTransferRemarks());
    }

    public getPreferences(): Array<string> {
        return this.preferences;
    }

    public setPreferences(preferences: Array<string>): void {
        this.preferences = preferences;
    }
}