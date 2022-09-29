import { ServiceObject } from "../ServiceObject";
import { User, UserRole } from "../User";
import { InventoryCostCenters } from "./InventoryCostCenters";
export enum KitchenStockRequestStatus {
    Draft = 'draft',
    Created = 'created',
    Issued = 'issued',
    Approved = 'approved'
}
export class InventoryKitchenStockRequestHistory extends ServiceObject {
    private requestStatus: KitchenStockRequestStatus;
    public getRequestStatus(): KitchenStockRequestStatus {
        return this.requestStatus;
    }

    public setRequestStatus(requestStatus: KitchenStockRequestStatus): void {
        this.requestStatus = requestStatus;
    }



}
export class InventoryKitchenStockModel extends ServiceObject {
    private restaurantId: string;
    private kitchenId: string;
    private orderCreatedOn: Date;
    private orderExpectedOn: Date;
    private orderRecievedOn: Date;
    private items: Array<InventoryKitchenStockItemsModel>;
    private chefId: string;
    private issuedBy: string;
    private requestCreatedBy: string;
    private requestStatus: KitchenStockRequestStatus;
    private requestStatusHistory: Array<InventoryKitchenStockRequestHistory>;
    private approvedBy: string;
    private requestedByUserType: UserRole;
    private kitchenName: string;
    private requestCreatedByUser : User;
    private kitchenModel : InventoryCostCenters;
    private txnId : number;
    private saveAsTemplate : boolean;
    private templateName : string;

    public isSaveAsTemplate(): boolean {
        return this.saveAsTemplate;
    }

    public setSaveAsTemplate(saveAsTemplate: boolean): void {
        this.saveAsTemplate = saveAsTemplate;
    }

    public getTemplateName(): string {
        return this.templateName;
    }

    public setTemplateName(templateName: string): void {
        this.templateName = templateName;
    }


    public getTxnId(): number {
        return this.txnId;
    }

    public setTxnId(txnId: number): void {
        this.txnId = txnId;
    }


    public getKitchenModel(): InventoryCostCenters {
        return this.kitchenModel;
    }

    public setKitchenModel(kitchenModel: InventoryCostCenters): void {
        this.kitchenModel = kitchenModel;
    }


    public getKitchenName(): string {
        return this.kitchenName;
    }

    public setKitchenName(kitchenName: string): void {
        this.kitchenName = kitchenName;
    }

    

    public getRequestCreatedByUser(): User {
        return this.requestCreatedByUser;
    }

    public setRequestCreatedByUser(requestCreatedByUser: User): void {
        this.requestCreatedByUser = requestCreatedByUser;
    }


    public getRequestedByUserType(): UserRole {
        return this.requestedByUserType;
    }

    public setRequestedByUserType(requestedByUserType: UserRole): void {
        this.requestedByUserType = requestedByUserType;
    }


    public getApprovedBy(): string {
        return this.approvedBy;
    }

    public setApprovedBy(approvedBy: string): void {
        this.approvedBy = approvedBy;
    }



    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getKitchenId(): string {
        return this.kitchenId;
    }

    public setKitchenId(kitchenId: string): void {
        this.kitchenId = kitchenId;
    }

    public getOrderCreatedOn(): Date {
        return this.orderCreatedOn;
    }

    public setOrderCreatedOn(orderCreatedOn: Date): void {
        this.orderCreatedOn = orderCreatedOn;
    }

    public getOrderExpectedOn(): Date {
        return this.orderExpectedOn;
    }

    public setOrderExpectedOn(orderExpectedOn: Date): void {
        this.orderExpectedOn = orderExpectedOn;
    }

    public getOrderRecievedOn(): Date {
        return this.orderRecievedOn;
    }

    public setOrderRecievedOn(orderRecievedOn: Date): void {
        this.orderRecievedOn = orderRecievedOn;
    }

    public getItems(): Array<InventoryKitchenStockItemsModel> {
        return this.items;
    }

    public setItems(items: Array<InventoryKitchenStockItemsModel>): void {
        this.items = items;
    }

    public getChefId(): string {
        return this.chefId;
    }

    public setChefId(chefId: string): void {
        this.chefId = chefId;
    }

    public getIssuedBy(): string {
        return this.issuedBy;
    }

    public setIssuedBy(issuedBy: string): void {
        this.issuedBy = issuedBy;
    }

    public getRequestCreatedBy(): string {
        return this.requestCreatedBy;
    }

    public setRequestCreatedBy(requestCreatedBy: string): void {
        this.requestCreatedBy = requestCreatedBy;
    }

    public getRequestStatus(): KitchenStockRequestStatus {
        return this.requestStatus;
    }

    public setRequestStatus(requestStatus: KitchenStockRequestStatus): void {
        this.requestStatus = requestStatus;
    }

    public getRequestStatusHistory(): Array<InventoryKitchenStockRequestHistory> {
        return this.requestStatusHistory;
    }

    public setRequestStatusHistory(requestStatusHistory: Array<InventoryKitchenStockRequestHistory>): void {
        this.requestStatusHistory = requestStatusHistory;
    }


}
export class InventoryKitchenStockItemsModel {
    private itemId: string;
    private storeId: string;
    private qty: number;
    private qtyUnit: string;
    private variantId: string;

    public getVariantId(): string {
        return this.variantId;
    }

    public setVariantId(variantId: string): void {
        this.variantId = variantId;
    }


    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getStoreId(): string {
        return this.storeId;
    }

    public setStoreId(storeId: string): void {
        this.storeId = storeId;
    }

    public getQty(): number {
        return this.qty;
    }

    public setQty(qty: number): void {
        this.qty = qty;
    }

    public getQtyUnit(): string {
        return this.qtyUnit;
    }

    public setQtyUnit(qtyUnit: string): void {
        this.qtyUnit = qtyUnit;
    }


}