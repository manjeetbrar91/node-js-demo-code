import { IDiscountDBManager } from "../../../db-layer/interfaces/ecommerce/IDiscountDBManager";
import { IDiscountService } from "../../../service-layer/interfaces/ecommerce/IDiscountService";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { ObjectStatus } from "../../../service-layer/models/ObjectStatus";
import { DiscountCouponModel } from "../../../service-layer/models/ecommerce/response/DiscountCouponModel";
import { GetDiscountCouponListRequestModel } from "../../../web-layer/models/ecommerce/request/GetDiscountCouponListRequestModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { CustomDiscount, CustomDiscountItems, CustomerOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";
import { DiscountType } from "../../../service-layer/models/Discount";
import { FixedAmountDiscount } from "../../../service-layer/models/ecommerce/discount/FixedAmountDiscount";
import { DiscountTypes } from "../../../common/utils/Constants";
import { OrderProductsModel } from "../../../service-layer/models/ecommerce/OrderProductsModel";
import { Utils } from "../../../common/utils/Utils";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { IProductsDBManager } from "../../../db-layer/interfaces/ecommerce/IProductsDBManager";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";
import { PercentageDiscount } from "../../../service-layer/models/ecommerce/discount/PercentageDiscount";


export class DiscountService implements IDiscountService {
    private readonly discountDBManager: IDiscountDBManager;
    private readonly productsDBManager: IProductsDBManager;

    constructor() {
        this.discountDBManager = DBManagerFactory.getDiscountDBManager();
        this.productsDBManager = DBManagerFactory.getProductsDBManager();

    }

    public async deleteDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel> {
        return await this.discountDBManager.deleteDiscountCoupon(promotion);
    }
    public async enableDisableDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel> {
        return await this.discountDBManager.enableDisableDiscountCoupon(promotion);
    }
    public async getDiscountCouponById(businessId: string, couponId: string): Promise<DiscountCouponModel> {
        return await this.discountDBManager.getDiscountCouponById(businessId, couponId);
    }
    public async addOrUpdateDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel> {

        let req = new GetDiscountCouponListRequestModel();
        req.businessId = promotion.getBusinessId();
        req.status = ObjectStatus.Active

        let existingPromotions = (await this.getDiscountCouponForBusiness(req)).getData();
        if (!promotion.isEnable() || promotion.getStatus() === ObjectStatus.Deleted) {

        } else {
            // let applicablePromotions = existingPromotions.filter(ep => ep.getId() != promotion.getId() && ep.getChannelTypes().filter(c => promotion.getChannelTypes().some(c1 => c1 === c)));
            // await this.evaluatePromotionUniqueness(promotion, applicablePromotions);
        }

        let savedPromotion: DiscountCouponModel = await this.discountDBManager.addOrUpdateDiscountCoupon(promotion);
        return savedPromotion;
    }
    public async getDiscountCouponForBusiness(req: GetDiscountCouponListRequestModel): Promise<ResultModel> {
        return await this.discountDBManager.getDiscountCouponForBusiness(req);
    }





    public async applyCouponPromotionV1(order: CustomerOrderModel, couponCode: string, throwUpdateOrder: boolean, couponId?: string): Promise<any> {


        let promotion: DiscountCouponModel = await this.discountDBManager.getDiscountCouponForBusinessByCouponCode(order.getBusinessId(), couponCode);
        if (promotion == undefined || promotion == null) {
            throw new MyError("This coupon not found.");

        }
        if (!promotion.isEnable() || promotion.getStatus() === ObjectStatus.Deleted) {
            if (throwUpdateOrder == undefined || throwUpdateOrder == false) {
                throw new MyError("This promotion has expired. Please try another coupon.");
            }
        }
        console.log("promotion.getStartDate() > new Date() ", promotion.getStartDate() > new Date());
        console.log("promotion.getEndDate() ", promotion.getEndDate());
        console.log("promotion.getEndDate() < new Date()", promotion.getEndDate() < new Date());
        console.log("promotion.getEndDate() < new Date()", (promotion.getEndDate() && promotion.getEndDate() < new Date()));

        if (promotion.getStartDate() > new Date()) {
            if (throwUpdateOrder == undefined || throwUpdateOrder == false) {
                //This coupon is not active now
                throw new MyError("This coupon is not active now.");
            }
        }
        if (promotion.getEndDate() && promotion.getEndDate() < new Date()) {
            if (throwUpdateOrder == undefined || throwUpdateOrder == false) {
                throw new MyError("This promotion has expired.");
            }
        }

        if (promotion.isLimitTotalUsage() || promotion.isPerCustomerUsage()) {
            // compare the count with the limit set
            if (promotion.isPerCustomerUsage()) {
                // let totalPerCustomerUsageCount: number = await this.discountDBManager.getUserPromotionOpticsForPhoneNumber(accountId, phoneNumber, promotionId);
                // if (totalPerCustomerUsageCount >= 1) {
                //     if (throwErrorMessage == undefined || throwErrorMessage == false) {
                //         throw new MyError('This coupon code has expired.');
                //     }
                // }
            }
            if (promotion.isLimitTotalUsage() === true) {

                // let coponTotalUsedCount = await this.discountDBManager.getUserPromotionOpticsForRestaurant(accountId, promotionId);
                // if (promotion.getUsageLimit() == undefined || promotion.getUsageLimit() == null) {
                //     promotion.setUsageLimit(1);
                // }

                // if (coponTotalUsedCount >= promotion.getUsageLimit()) {
                //     if (throwErrorMessage == undefined || throwErrorMessage == false) {
                //         throw new MyError('This coupon code has expired.');
                //     }
                // }
            }

            // return from here with the message "This coupon code has expired."
        }


        // const order: RestaurantCustomerOrder = await this.orderDBManager.updatePromotions(accountId, orderId, [promotion.getId()]);

        order.setCustomDiscount(new CustomDiscount(0, 0))
        order.setTotalDiscount(0)
        order.setCustomDiscountAmount(0)
        order.setCustomDiscountPercentage(0);
        // if (!promotion.getChannelTypes().includes(order.getChannelType())) {
        //     if (throwErrorMessage == undefined || throwErrorMessage == false) {
        //         throw new MyError('Coupon does not apply for this channel.');
        //     }
        // }



        // const restaurant: Restaurant = await this.tenantDBManager.getRestaurantById(order.getRestaurantId());
        // const existingBill: OrderBill = await this.billService.getBillFromOrder(order);

        let updatedBill: CustomerOrderModel = order;
        switch (promotion.getDiscountType()) {
            case DiscountType.Percentage: {
                let percentageDiscount = promotion.getDiscountMetadata() as PercentageDiscount;
                let bill = await percentageDiscount.ApplyDiscount(order, null, null, throwUpdateOrder);
                bill.getCustomDiscount().setPromotionId(couponId);
                // bill = await this.setPromotionDetails(bill, promotion, promotionId)
                updatedBill = await this.addCategoryWiseDiscount(bill, true);
                break;
            }
            case DiscountType.FixedAmount: {
                let fixedDiscount = promotion.getDiscountMetadata() as FixedAmountDiscount;
                let bill = await fixedDiscount.ApplyDiscount(order, null, null, throwUpdateOrder);
                bill.getCustomDiscount().setPromotionId(couponId);
                // bill = await this.setPromotionDetails(bill, promotion, promotionId)
                updatedBill = await this.addCategoryWiseDiscount(bill, throwUpdateOrder);
                // updatedBill = bill
                break;
            }
            // case DiscountType.BuyXGetY:
            //     let buyXGetYDiscount = promotion.getDiscountMetadata() as BuyXGetYDiscount;
            //     let bill = await buyXGetYDiscount.ApplyDiscountV1(existingBill, throwErrorMessage);
            //     bill.getCustomDiscount().setPromotionId(promotionId);
            //     bill.getCustomDiscount().setDiscountNotes("Coupon Disount " + promotion.getName());
            //     bill = await this.setPromotionDetails(bill, promotion, promotionId)
            //     updatedBill = await this.billService.addCategoryWiseDiscount(bill, true);
            //     break;
        }

        return updatedBill;
    }
    // public async getDiscountCouponForBusiness(req: GetDiscountCouponListRequestModel): Promise<ResultModel> {
    // let promotions: Array<Promotion> = await this.discountDBManager.getPromotionsForAccount(accountId, status, type);
    // for (let promotion of promotions) {
    //     const actualUsage: number = await this.discountDBManager.getUserPromotionOpticsForRestaurant(promotion.getAccountId(), promotion.getId());
    //     promotion.setActualUsage(actualUsage);
    //     const unusableCount: number = await this.discountDBManager.getUserPromotionOpticsForRestaurantByStatus(promotion.getAccountId(), promotion.getId());
    //     promotion.setUnusableCount(unusableCount);
    // }
    // return promotions;
    // return []
    // }


    public async addCategoryWiseDiscount(order: CustomerOrderModel, throwValidateError: boolean): Promise<CustomerOrderModel> {
        let fromGenerateBill = false;

        if (throwValidateError == false) {
            fromGenerateBill = true;
        }

        let customDiscount: CustomDiscount = order.getCustomDiscount();
        if (customDiscount == undefined) {
            customDiscount = new CustomDiscount(0, 0);
        }
        let discoutType = customDiscount.getDiscoutType();



        let exsitingCustomDiscount: CustomDiscount = null;
        // let existingPromotionId = exsitingCustomDiscount.getPromotionId() ? exsitingCustomDiscount.getPromotionId() : "";
        // if (customDiscount && customDiscount.isPromotionDiscount() != undefined && customDiscount.isPromotionDiscount() == true) {

        exsitingCustomDiscount = new CustomDiscount(0, 0);
        exsitingCustomDiscount.initEmpty();
        // }

        let dishes;
        if (discoutType == undefined || discoutType == '') {
            if (throwValidateError) {
                throw new MyError("Discount Type is required field.")
            } else {
                return order;
            }
        }
        if (discoutType == DiscountTypes.wholeBill) {

        } else if (discoutType == DiscountTypes.categoryWise) {
            let categoryList = customDiscount.getCategory();
            let categoryIdList = EcommerceUtility.getCategoryIdList(categoryList);
            if (customDiscount.getCategory() == undefined || customDiscount.getCategory().length == 0 || categoryIdList.length == 0) {
                throw new MyError("Category is required field.");
            }
            dishes = await this.productsDBManager.getAllProductsByProductIdArray(EcommerceUtility.getBillItemIdList(order.getProducts()));
            if (dishes.length == 0) {
                throw new MyError("Category not exists");
            }
        } else if (discoutType == DiscountTypes.itemWise) {

            let exsitingDiscountItem = exsitingCustomDiscount.getCustomDiscountItemsList();
            // if (existingBill.getCustomDiscount().getDiscoutType() != DiscountTypes.itemWise) {
            //     exsitingDiscountItem = new Array();
            // }
            var items = customDiscount.getCustomDiscountItemsList();
            if (items.length <= 0 && !fromGenerateBill) {
                throw new MyError("Item discount details are missing");
            }
            items.forEach(item => {


                let existingItemIndex = this.findExsitingItemIndex(item, exsitingDiscountItem);
                if (existingItemIndex == -1) {
                    exsitingDiscountItem.push(item);
                } else {
                    exsitingDiscountItem.splice(existingItemIndex, 1);
                    exsitingDiscountItem.push(item);
                }
            });
            exsitingDiscountItem = await this.validateAndRectifyItem(exsitingDiscountItem, order.getProducts())
            customDiscount.setCustomDiscountItemsList(exsitingDiscountItem);
            order.setCustomDiscount(customDiscount);
            if (customDiscount.isPromotionDiscount() == true) {
                if (customDiscount.getCustomDiscountItemsList() == undefined || customDiscount.getCustomDiscountItemsList().length <= 0 || customDiscount.getCustomDiscountItemsList()[0] == undefined) {
                    throw new MyError("Discount is not applicable.");
                }
            }
        }
        if (discoutType == DiscountTypes.categoryWise) {

        }
        if (customDiscount.getDiscoutType() == DiscountTypes.categoryWise) {
            customDiscount.setCategoryCustomDiscountItemsList(await this.getDiscountedItemList(order.getProducts(), dishes));
            if (customDiscount.getCategoryCustomDiscountItemsList().length == 0) {
                throw new MyError("Discount not applicable");
            }

            customDiscount = await this.caculateDiscountCategoryWisePercentage(customDiscount, fromGenerateBill);

            customDiscount = await this.caculateCategoryItemDisount(customDiscount.getAmount(), customDiscount.getPercentage(), customDiscount)


        } else if (customDiscount.getDiscoutType() == DiscountTypes.itemWise) {
            customDiscount = await this.caculateItemDisount(customDiscount.getAmount(), customDiscount.getPercentage(), customDiscount)
        } else if (customDiscount.getDiscoutType() == DiscountTypes.wholeBill) {
            await this.caculateWholeBillPercentage(customDiscount, order.getProducts(), fromGenerateBill)
            customDiscount = await this.caculateDiscountPercentage(customDiscount);
        }

        if (customDiscount.getTotalDiscount() == 0) {
            customDiscount.setDiscountNotes("");
        }
        // else if (order.getChannelType() === ChannelType.Swiggy || order.getChannelType() == ChannelType.Zomato || order.getChannelType() == ChannelType.MagicPin) {
        //     if (customDiscount.getDiscoutType() == DiscountTypes.itemWise && customDiscount.getCustomDiscountItemsList().length > 0) {
        //         customDiscount.setDiscountNotes(customDiscount.getCustomDiscountItemsList()[0].getDiscoutNotes());
        //     }
        // }
        order.setCustomDiscount(customDiscount);
        let totalcustomDiscount = customDiscount.getTotalDiscount();


        let discount: number = order.getTotalDiscount() ? order.getTotalDiscount() : 0;

        if (totalcustomDiscount >= 0) {
            // existingOrder.setTotalDiscount(discount + totalcustomDiscount - existingCustomDiscount);
            order.setTotalDiscount(Utils.roundedOff(customDiscount.getTotalDiscount()));
            order.setCustomDiscountAmount(totalcustomDiscount);
        }

        customDiscount.setTotalDiscount(Utils.roundedOff(customDiscount.getTotalDiscount()))




        // let verifiedOrder: RestaurantCustomerOrder = await this.orderService.validateAndRectifyOrderV1(existingOrder, customDiscount);

        // verifiedOrder.setCustomDiscount(customDiscount);

        // const updatedOrder: RestaurantCustomerOrder = await this.orderDBManager.updateBillDetailsOfOrder(verifiedOrder, restaurant);

        // let bill: OrderBill = Utility.getBillFromOrderV1(verifiedOrder, customer, restaurant, customDiscount);
        // bill.setNotes(req.getNotes());
        // if (restaurant && restaurant.getGeneralSettings() && restaurant.getGeneralSettings().getIncludeTaxInPrice() == true) {
        //     //console.log("Test")
        // } else {
        //     let xx = Utility.updateCustomDiscountForSelectedBillItems(bill, customDiscount);
        // }

        // bill.setCustomDiscount(customDiscount);
        // bill.setGstName(gstName);
        // bill.setGstNumber(gstNumber);

        // if (customDiscount && customDiscount.isPromotionDiscount() != undefined && customDiscount.isPromotionDiscount() == true) {
        //     bill.setPromotionId(customDiscount.getPromotionId())
        // } else {
        //     if (existingPromotionId && existingPromotionId != "") {
        //         await DBManagerFactory.getDiscountDBManager().removeUserPromotionOptics(bill.getOrderId(), existingPromotionId);
        //     }
        //     bill.setPromotionId(undefined)
        // }
        // if (existingBill) {
        //     bill.setGeneratedFromPos(existingBill.isGeneratedFromPos());
        //     if (existingBill.getTokenNumber() != undefined && existingBill.getTokenNumber() >= 0) {
        //         bill.setTokenNumber(existingBill.getTokenNumber());
        //     }
        // }
        // let savedBill: OrderBill = await this.updateBill(bill);
        // await this.orderDBManager.updateBillDetailsOfOrder(updatedOrder, restaurant);

        // if (savedBill.getWaiterName() == undefined || savedBill.getWaiterName() == "") {
        //     let waiterdata: Employee = await this.userService.getEmployeeById(existingOrder.getWaiterId());
        //     if (waiterdata != undefined) {
        //         if (waiterdata) {
        //             savedBill.setWaiterName(waiterdata.getFirstName());
        //         }
        //     }
        // }
        return order;
    }
    public findExsitingItemIndex(newItem: CustomDiscountItems, existingItemArray: Array<CustomDiscountItems>): number {
        for (var i = 0; i < existingItemArray.length; i++) {
            let item = existingItemArray[i];
            if (item.getItemId() == newItem.getItemId() && item.getItemName() == newItem.getItemName()) {
                if (item.getDishAddOns().length == newItem.getDishAddOns().length
                    && item.getDishAddOns().every(function (u, i) {
                        return u == newItem.getDishAddOns()[i];
                    })
                ) {

                    return i;
                }
            }
        }
        return -1;
    }

    public async caculateWholeBillPercentage(customDiscount: CustomDiscount, items: Array<OrderProductsModel>, fromGenerateBill: boolean): Promise<CustomDiscount> {


        let itemstotalPrice = 0;
        items.forEach(item => {
            // if (item.isExcludeFromDiscount() != undefined && item.isExcludeFromDiscount() == true) {
            // } else {
            itemstotalPrice = itemstotalPrice + (item.getSellingPrice() * item.getQuantity())
            // }

        });
        let totalDiscount: number = 0;

        let totalDiscountPercentage: number = 0;
        if (customDiscount.isPromotionDiscount() == true && customDiscount.getAmount() > itemstotalPrice) {
            customDiscount.setAmount(itemstotalPrice)
            if (itemstotalPrice == 0) {
                throw new MyError("Discount is not applicable.");
            }
        }
        if (fromGenerateBill == true && customDiscount.getAmount() > itemstotalPrice && customDiscount.isFixedDiscount() == true) {
            customDiscount.setAmount(0);
            customDiscount.setPercentage(0)
        } else if (fromGenerateBill == true && itemstotalPrice <= 0 && customDiscount.isFixedDiscount() == false) {
            customDiscount.setAmount(0);
            customDiscount.setPercentage(0)
        } else if (customDiscount.isFixedDiscount() == true && customDiscount.getAmount() > 0) {
            var percentage = (customDiscount.getAmount() * 100) / itemstotalPrice;
            customDiscount.setPercentage(percentage);
        } else if (customDiscount.isFixedDiscount() == false && customDiscount.getPercentage() > 0) {

            customDiscount.setAmount((itemstotalPrice * customDiscount.getPercentage()) / 100);
        }
        if (fromGenerateBill == false && customDiscount.getAmount() > itemstotalPrice) {
            throw new MyError("Discount amount Rs." + customDiscount.getAmount() + " is not valid");
        }

        customDiscount.setTotalDiscount(customDiscount.getAmount())
        return customDiscount;
    }
    public async caculateDiscountPercentage(customDiscount: CustomDiscount): Promise<CustomDiscount> {
        let amount = customDiscount.getAmount();
        var finalPrice = 0;
        customDiscount.getCustomDiscountItemsList().forEach(item => {
            finalPrice += item.getItemPrice() * item.getQuantity();
        });
        if (customDiscount.getDiscoutType() == DiscountTypes.categoryWise) {
            customDiscount.getCategoryCustomDiscountItemsList().forEach(item => {
                finalPrice += item.getItemPrice() * item.getQuantity();
            });
        }
        if (customDiscount.getDiscoutType() == DiscountTypes.printerTag) {
            customDiscount.getTagCustomDiscountItemsList().forEach(item => {
                finalPrice += item.getItemPrice() * item.getQuantity();
            });
        }
        if (amount > 0 && customDiscount.getPercentage() == 0) {
            var percentage = (amount * 100) / finalPrice;
            customDiscount.setPercentage(percentage);
        } else if (amount == 0 && customDiscount.getPercentage() > 0) {
            amount = (finalPrice * customDiscount.getPercentage()) / 100;
            customDiscount.setPercentage(amount);
        }

        return customDiscount;
    }


    public async caculateItemDisount(amount: number, percentage: number, customDiscount: CustomDiscount): Promise<CustomDiscount> {
        customDiscount.setTotalDiscount(0);
        percentage = 0;
        let notes: string[] = [];
        customDiscount.getCustomDiscountItemsList().forEach(item => {
            if (customDiscount.getDiscoutType() == DiscountTypes.itemWise) {
                if (item.getAmount() > 0 && item.getPercentage() <= 0) {
                    percentage = ((item.getItemPrice() * item.getQuantity()) / item.getAmount()) / 100;
                }
                percentage = item.getPercentage();
            }
            let finalPrice = item.getItemPrice() * item.getQuantity();
            finalPrice = finalPrice ? finalPrice : 0;
            let discount = (finalPrice * percentage) / 100.0;
            discount = discount ? discount : 0;
            discount = Utils.roundedOff(discount);
            finalPrice = finalPrice - discount;
            item.setAmount(discount);
            item.setPercentage(percentage);
            customDiscount.setTotalDiscount(customDiscount.getTotalDiscount() + discount);

            notes.push(item.getDiscoutNotes());

        });
        if (customDiscount.getDiscoutType() == DiscountTypes.itemWise) {
            customDiscount.setAmount(customDiscount.getTotalDiscount())
        }
        customDiscount.setDiscountNotes(notes.toString())
        return customDiscount;
    }
    public async getDiscountedItemList(items: Array<OrderProductsModel>, dishes: Array<CartResponseModel>): Promise<Array<CustomDiscountItems>> {
        var itemList = new Array<CustomDiscountItems>();
        items.forEach(d => {
            let isExcludeFromDiscount = false;
            //   if (d.isExcludeFromDiscount() != undefined && d.isExcludeFromDiscount() == true) {
            //     isExcludeFromDiscount = true;
            //   }
            let index: number = dishes.findIndex(od => od.getProductId() == d.getProductId());
            if (index === -1) {
                console.log("Item Not Found ")
            } else {
                let dish = d;
                let customDiscountItem = new CustomDiscountItems();
                customDiscountItem.setItemId(dish.getProductId());
                customDiscountItem.setItemName(dish.getProductName());
                customDiscountItem.setItemPrice(dish.getSellingPrice());
                customDiscountItem.setQuantity(dish.getQuantity());
                // customDiscountItem.setDishAddOns(dish.getDishAddOns());
                // customDiscountItem.setPrinterTag((dishes[index]).getPrinterTag())
                customDiscountItem.setCategoryId(dish.getCategoryId());
                if (dish.getQuantity() > 0 && isExcludeFromDiscount == false) {
                    itemList.push(customDiscountItem);
                }
            }

        });
        // orders.getKots().forEach((kt: any) => {
        //   kt.orderedDishes.forEach(d => {

        //   });

        // });
        return itemList;
    }
    public async validateAndRectifyItem(newItems: Array<CustomDiscountItems>, existingItemArray: Array<OrderProductsModel>): Promise<Array<CustomDiscountItems>> {

        let tempArray = new Array<CustomDiscountItems>();
        newItems.forEach(newItem => {

            for (var i = 0; i < existingItemArray.length; i++) {
                let item = existingItemArray[i];
                if (item.getProductId() == newItem.getItemId()
                    //  && item.getProductName() == newItem.getItemName()
                    //   && item.getDishAddOns().every(function (u, i) {
                    //     return u == newItem.getDishAddOns()[i];
                    //   }
                    //   )
                ) {
                    // if (item.getDishAddOns().length == newItem.getDishAddOns().length) {
                    newItem.setItemPrice(item.getSellingPrice());
                    newItem.setQuantity(item.getQuantity());
                    if (newItem.getAmount() > 0 && newItem.getPercentage() == 0) {
                        newItem.setPercentage((newItem.getAmount() * 100) / (newItem.getItemPrice() * newItem.getQuantity()))
                    }
                    let isExcludeFromDiscount = false;
                    // if (item.isExcludeFromDiscount() != undefined && item.isExcludeFromDiscount() == true) {
                    //     isExcludeFromDiscount = true;
                    // }
                    if (item.getQuantity() > 0 && isExcludeFromDiscount == false) {
                        tempArray.push(newItem);
                    }
                    // }
                    break;
                }
            }
        });
        return tempArray;
    }
    public async caculateDiscountCategoryWisePercentage(customDiscount: CustomDiscount, fromGenerateBill: boolean): Promise<CustomDiscount> {

        let category = customDiscount.getCategory();

        let totalAmount = 0;

        customDiscount.getCategoryCustomDiscountItemsList().forEach(item => {
            let index = category.findIndex(cat => cat.getCategoryId() == item.getCategoryId());
            if (index != -1) {
                category[index].setItemsTotalPrice(category[index].getItemsTotalPrice() + (item.getItemPrice() * item.getQuantity()));
            }
            //cateoryDicountModel.setAmount(category.get)    
            //finalPrice += ;
        });
        let totalDiscount: number = 0;
        let totalDiscountPercentage: number = 0;
        let notes: string[] = []
        category.forEach(data => {
            if (fromGenerateBill == false && data.getAmount() > data.getItemsTotalPrice()) {
                throw new Error("Category discount amount Rs. " + data.getAmount() + " is not valid");
            }
            if ((fromGenerateBill == false && data.getItemsTotalPrice() == 0 && data.getPercentage() > 0) || data.getPercentage() > 100) {
                throw new Error("Category discount " + data.getPercentage() + "% is not valid");
            }
            if (fromGenerateBill == true && data.getAmount() > data.getItemsTotalPrice() && data.isFixedDiscount() == true) {
                data.setAmount(0);
                data.setPercentage(0)
            } else if (fromGenerateBill == true && data.getItemsTotalPrice() <= 0 && data.isFixedDiscount() == false) {
                data.setAmount(0);
                data.setPercentage(0)
            } else if (data.isFixedDiscount() == true && data.getAmount() > 0) {
                var percentage = (data.getAmount() * 100) / data.getItemsTotalPrice();
                data.setPercentage(percentage);
            } else if (data.isFixedDiscount() == false && data.getPercentage() > 0) {
                data.setAmount((data.getItemsTotalPrice() * data.getPercentage()) / 100);
            }
            totalAmount = totalAmount + data.getItemsTotalPrice();
            totalDiscount = totalDiscount + data.getAmount();
            totalDiscountPercentage = totalDiscountPercentage + data.getPercentage();

        })
        customDiscount.setAmount(totalDiscount)
        customDiscount.setTotalDiscount(totalDiscount)
        customDiscount.setPercentage((totalDiscount * 100) / totalAmount);

        return customDiscount;
    }
    public async caculateCategoryItemDisount(amount: number, percentage: number, customDiscount: CustomDiscount): Promise<CustomDiscount> {
        customDiscount.setTotalDiscount(0);
        customDiscount.getCategoryCustomDiscountItemsList().forEach(item => {
            let categoryData = customDiscount.getCategory().find(cat => cat.getCategoryId() == item.getCategoryId());
            if (categoryData != undefined) {
                percentage = categoryData.getPercentage();
            } else {
                percentage = 0;
            }
            if (isNaN(percentage)) {
                percentage = 0;
            }
            let finalPrice = item.getItemPrice() * item.getQuantity();
            finalPrice = finalPrice ? finalPrice : 0;
            let discount = (finalPrice * percentage) / 100.0;
            discount = discount ? discount : 0;
            discount = Utils.roundedOff(discount);
            finalPrice = finalPrice - discount;
            item.setAmount(discount);
            item.setPercentage(percentage);
            customDiscount.setTotalDiscount(customDiscount.getTotalDiscount() + discount);
        });
        if (customDiscount.getDiscoutType() == DiscountTypes.itemWise) {
            customDiscount.setAmount(customDiscount.getTotalDiscount())
        }

        return customDiscount;
    }
}
