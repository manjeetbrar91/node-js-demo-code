import { MyError } from "../../../../common/MyError";
import { DiscountTypes } from "../../../../common/utils/Constants";
import { CategoryDiscount, CustomDiscount, CustomDiscountItems, CustomerOrderModel } from "../CustomerOrderModel";
import { DiscountBase } from "./DiscountBase";
import { DishEligibility, DishEligibilityType } from "./DishEligibility";

export enum MinimumOrderRequirementType {
    none = 'none',
    purchaseamount = 'purchaseAmount',
    quantity = 'quantity'
}

export class FixedAmountDiscount extends DiscountBase {
    private value: number;
    private dishEligibility: DishEligibility;
    private minimumOrderRequirement: number;
    private minimumOrderRequirementType: MinimumOrderRequirementType;
    CheckEligibility() {

    }
    constructor() {
        super();
    }
    public getDishEligibility(): DishEligibility {
        return this.dishEligibility;
    }

    public setDishEligibility(dishEligibility: DishEligibility): void {
        this.dishEligibility = dishEligibility;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }


    public getMinimumOrderRequirement(): number {
        return this.minimumOrderRequirement;
    }

    public setMinimumOrderRequirement(minimumOrderRequirement: number): void {
        this.minimumOrderRequirement = minimumOrderRequirement;
    }

    public getMinimumOrderRequirementType(): MinimumOrderRequirementType {
        return this.minimumOrderRequirementType;
    }

    public setMinimumOrderRequirementType(minimumOrderRequirementType: MinimumOrderRequirementType): void {
        this.minimumOrderRequirementType = minimumOrderRequirementType;
    }


    public async ApplyDiscount(bill: CustomerOrderModel, discountPercentage = null, maximumDiscount = null, fromGenerateBill: boolean): Promise<CustomerOrderModel> {
        if (this.getMinimumOrderRequirementType() === MinimumOrderRequirementType.purchaseamount
            && (bill.getSubTotal()) < this.getMinimumOrderRequirement()) {
            if (fromGenerateBill) {
                return this.removeDiscount(bill);
            } else {
                throw new MyError('Coupon not applicable. Please add items worth Rs.' + this.getMinimumOrderRequirement() + ' or more for this coupon');

            }
        }
        if (!discountPercentage) {
            maximumDiscount = this.value;
        }
        if (this.dishEligibility.getEligilibityType() === DishEligibilityType.order) {
            return this.applyOrderDiscount(bill, discountPercentage, maximumDiscount, fromGenerateBill);
        } else if (this.dishEligibility.getEligilibityType() === DishEligibilityType.category) {
            return await this.applyCategoryDiscountV1(bill, discountPercentage, maximumDiscount, fromGenerateBill);
        } else if (this.dishEligibility.getEligilibityType() === DishEligibilityType.item) {
            return this.applySpecialItemDiscount(bill, discountPercentage, maximumDiscount, fromGenerateBill);
        }
        return bill;
    }


    private applyOrderDiscount(bill: CustomerOrderModel, discountPercentage = null, maximumDiscount = null, fromGenerateBill: boolean): CustomerOrderModel {


        ///


        // Even for the inclusive tax restaurants, the discount should be calculated on the subtotal only.
        // In case this requirement changes in future, please update the assignment of the total to the total bill mount.
        let total = bill.getSubTotal();

        let calculatedDiscountPercentage = this.getDiscountPercentage(total, maximumDiscount, discountPercentage);

        let customDiscount = new CustomDiscount(0, 0);
        customDiscount.initEmpty();
        customDiscount.setDiscountType(DiscountTypes.wholeBill);
        customDiscount.setPromotionDiscount(true);
        customDiscount.setPromotionId("");
        customDiscount.setDiscountNotes("Coupon Disount");
        let applicableDiscount = (total * discountPercentage) / 100
        if (discountPercentage == null || discountPercentage == undefined) {
            applicableDiscount = maximumDiscount;
        }
        if (maximumDiscount != null && maximumDiscount != undefined && Number(maximumDiscount) > 0 && (Number(maximumDiscount) <= applicableDiscount)) {
            customDiscount.setAmount(maximumDiscount);
            customDiscount.setIsFixed(true)
            customDiscount.setPercentage(0);
            bill.setTotalDiscount(maximumDiscount)
        } else {
            customDiscount.setPercentage(calculatedDiscountPercentage);
            customDiscount.setAmount(0);
            customDiscount.setIsFixed(false)
        }

        bill.setCustomDiscount(customDiscount);
        // let orderDiscount = discountPercentage ? (total * .01 * calculatedDiscountPercentage) : this.value;
        // let totalTaxReduction = 0;
        // bill.getItems().forEach(item => totalTaxReduction += this.getTaxReduction(item, calculatedDiscountPercentage, bill));
        // // bill.setTotalTax(bill.getTotalTax() - totalTaxReduction);
        // bill.setTotalDiscount(Number(((bill.getTotalDiscount() ? bill.getTotalDiscount() : 0) + orderDiscount).toFixed(2)));
        // bill.setTotalAmount(Number((bill.getTotalAmount() - orderDiscount).toFixed(2)));
        // this.updateServiceCharge(bill, orderDiscount);

        // bill.setRoundOffValue(Utils.roundedOff(Utils.roundedOffWithDecimal(bill.getTotalAmount()) - bill.getTotalAmount()));
        // bill.setTotalAmount(Utils.roundedOffWithDecimal(bill.getTotalAmount()));
        // if (bill.getTotalAmount() < 0) {
        //     bill.setTotalAmount(0);
        // }

        return bill;
    }
    private removeDiscount(bill: CustomerOrderModel): CustomerOrderModel {


        let customDiscount = new CustomDiscount(0, 0);
        customDiscount.initEmpty()
        customDiscount.setDiscountType(DiscountTypes.wholeBill);
        customDiscount.setPromotionDiscount(false);
        customDiscount.setPromotionId("");
        bill.setCustomDiscount(customDiscount);
        return bill;
    }


    private getDiscountPercentage(amount: number, maximumDiscount = null, discount = null): number {
        let discountPercentage = discount ? discount : this.value * 100 / amount;
        discountPercentage = discountPercentage > 100 ? 100 : discountPercentage;
        let discountApplicable = amount * discountPercentage * .01;
        if (maximumDiscount && discountApplicable > maximumDiscount) {
            discountPercentage = ((maximumDiscount / amount) * 100);
        }

        return discountPercentage;
    }


    public async applyCategoryDiscountV1(bill: CustomerOrderModel, discountPercentage = null, maximumDiscount = null, fromGenerateBill: boolean): Promise<CustomerOrderModel> {

        // let resp = await this.itemService.getDishTagsAndCategoryByDishIds(bill.getItems().map(i => i.getItemId()))
        let categoryList = bill.getProducts();
        let customDiscount = new CustomDiscount(0, 0);
        customDiscount.initEmpty();

        customDiscount.setDiscountType(DiscountTypes.categoryWise);
        customDiscount.setPromotionDiscount(true);
        customDiscount.setPromotionId("");
        customDiscount.setDiscountNotes("Coupon Disount");
        // customDiscount.getCategory().
        for (let cat of categoryList) {
            let catId = cat.getCategoryId();
            let catIndex = customDiscount.getCategory().findIndex(c => c.getCategoryId() == cat.getCategoryId().toString());//check for duplicate in discount
            if (catIndex == -1 && this.dishEligibility.getCategoryIds().findIndex(c => c.toString() == cat.getCategoryId().toString()) != -1) {
                let categoryDiscount = new CategoryDiscount();
                categoryDiscount.setPercentage(discountPercentage);
                categoryDiscount.setCategoryId(cat.getCategoryId())
                categoryDiscount.setAmount(0);
                categoryDiscount.setIsFixed(false);
                customDiscount.getCategory().push(categoryDiscount)
            }
        }
        if (customDiscount.getCategory().length == 0) {
            // throw new MyError("Discount ")
            if (fromGenerateBill == undefined || fromGenerateBill == false) {
                throw new MyError("Coupon not applicable.");
            } else {
                return this.removeDiscount(bill);
            }
        }

        bill.setCustomDiscount(customDiscount);
        return bill;
        // let dishes = await this.getDishIdsFromCategoryIds(this.dishEligibility.getCategoryIds());
        // let hasMatch: boolean = false;

        // for (let dish of dishes) {
        //     let index: number = bill.getItems().findIndex(i => i.getItemId() === dish);
        //     if (index > -1) {
        //         hasMatch = true;
        //     }
        // }
        // if (!hasMatch) {
        //     throw new MyError('Coupon not applicable');
        // }

        // this.applyItemDiscount(bill, dishes, discountPercentage, maximumDiscount, settings);
        // return bill;
    }

    private applySpecialItemDiscount(bill: CustomerOrderModel, discountPercentage = null, maximumDiscount = null, fromGenerateBill: boolean): CustomerOrderModel {
        let dishes = this.getDishEligibility().getProductIds();
        let hasMatch: boolean = false;
        for (let dish of dishes) {
            let index: number = bill.getProducts().findIndex(i => i.getProductId() === dish);
            if (index > -1) {
                hasMatch = true;
                break
            }
        }
        this.applyItemDiscountV1(bill, dishes, discountPercentage);
        if (!hasMatch || bill.getCustomDiscount().getCustomDiscountItemsList().length == 0) {


            // throw new MyError("Discount ")
            if (fromGenerateBill == undefined || fromGenerateBill == false) {
                throw new MyError('Coupon not applicable');
            } else {
                return this.removeDiscount(bill);
            }
        }


        return bill;
    }

    private applyItemDiscountV1(bill: CustomerOrderModel, dishes: string[], discountPercentage = null) {

        let customDiscount = new CustomDiscount(0, 0);
        customDiscount.initEmpty();

        customDiscount.setDiscountType(DiscountTypes.itemWise);
        customDiscount.setPromotionDiscount(true);
        customDiscount.setPromotionId("");
        customDiscount.setDiscountNotes("Coupon Disount");
        customDiscount.getCustomDiscountItemsList();

        let existingDiscount = bill.getTotalDiscount() ? bill.getTotalDiscount() : 0;
        for (let item of bill.getProducts()) {
            if (!dishes.includes(item.getProductId())) {
                continue;
            }
            let discountItem = new CustomDiscountItems();
            discountItem.setItemId(item.getProductId());
            discountItem.setItemName(item.getProductName());
            // discountItem.setDishAddOns(item.getDishAddOns());
            discountItem.setPercentage(discountPercentage);
            discountItem.setAmount(0);
            discountItem.setIsFixed(false);
            discountItem.setDiscountNotes(customDiscount.getDiscoutNotes());
            customDiscount.getCustomDiscountItemsList().push(discountItem);
        }
        bill.setCustomDiscount(customDiscount);
        // return bill;
    }
}

