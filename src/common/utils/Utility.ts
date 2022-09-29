import { ServiceObject } from "../../service-layer/models/ServiceObject";
import { ObjectID } from 'bson';
import { ObjectStatus } from "../../service-layer/models/ObjectStatus";
import { Utils } from "./Utils";
import { BaseRequest } from "../../web-layer/BaseRequest";
import { DBConstants } from "../../db-layer/models/DBConstants";
import { Payment, PaymentWebhookRespone } from "../../service-layer/models/Payment";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { Country } from "../../service-layer/models/CountryModel";
import { OrderAuditLog } from "../../service-layer/models/ecommerce/OrderAuditLog";
import { ECommerceCommisionSettingsBaseModel, ECommerceCommisionSettingsModel } from "../../service-layer/models/ecommerce/response/ECommerceCommisionSettingsBaseModel";
import { EcommerceUtility } from "./ecommerce/EcommerceUtility";
import { DiscountCouponModel, DiscountType } from "../../service-layer/models/ecommerce/response/DiscountCouponModel";
import { DiscountBase } from "../../service-layer/models/ecommerce/discount/DiscountBase";
import { PercentageDiscount } from "../../service-layer/models/ecommerce/discount/PercentageDiscount";
import { FixedAmountDiscount, MinimumOrderRequirementType } from "../../service-layer/models/ecommerce/discount/FixedAmountDiscount";
import { BuyXGetYDiscount } from "../../service-layer/models/ecommerce/discount/BuyXGetYDiscount";
import { DishEligibility, DishEligibilityType } from "../../service-layer/models/ecommerce/discount/DishEligibility";
export class Utility {
  public static setServiceObjectProperties(object: ServiceObject, item: any): void {
    const id = item._id != null ? item._id : item.id;
    if (id) {
      object.setId(Utility.getStringId(id));
    }
    object.setEnable(item.enable);
    object.setCreatedAt(item.createdAt);
    object.setLastModifiedAt(item.updatedAt ? item.updatedAt : item.lastModifiedAt);
    object.setStatus(Utils.parseDefaultEnum(item.status, ObjectStatus, ObjectStatus.Active));
  }
  public static getListOfItems<T>(itemsArray: any, getItem: (item: any) => T): Array<T> {
    if (itemsArray == undefined || itemsArray == null) {
      return [];
    }

    let items: Array<T> = itemsArray.map(it => {
      return getItem(it);
    });

    return items;
  }
  public static getBasicDbObject() {
    let updateTime: Date = new Date();
    return {
      updatedTS: updateTime.getTime(),
      updatedAt: updateTime
    }
  }
  public static getStringId(id: any): string {
    return id != null ? new ObjectID(id).toHexString() : null;
  }
  public static baseRequestToResultModel(req: BaseRequest, resultModel: ResultModel): ResultModel {
    resultModel.setLimit(req.limit)
    resultModel.setLimit(req.offset)
    // resultModel.setLimit(req.searchText)
    // resultModel.setLimit(req.sortBy)
    // resultModel.set(req.sortingField)

    // resultModel.setSo(req.sortingOrder)
    return resultModel;
  }
  public static validateRequest(req: BaseRequest): any {
    req.limit = req.limit != undefined ? req.limit : DBConstants.defaultLimit;
    req.offset = req.offset != undefined ? req.offset : DBConstants.defaultOffset;
    req.sortingField = req.sortingField ? req.sortingField : DBConstants.defaultSortingField;
    if (req.sortBy && req.sortBy.toLowerCase() === 'asc') {
      req.sortingOrder = DBConstants.ASCsorting;
    }
    else {
      req.sortingOrder = DBConstants.DESCsorting;
    }
    req.sortingObject = {};
    req.sortingObject[req.sortingField] = req.sortingOrder;
    return req;
  }






  public static enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
  }

  // public static getTableSectionData(data: any): TableSectionData {
  //   let section: TableSectionData = new TableSectionData();
  //   section.setSection(data._id[0]);
  //   section.setOrders(data.numberOfOrders);
  //   section.setRevenue(data.revenue);
  //   section.setNetRevenue(data.netRevenue);
  //   section.setDiscount(data.discount);
  //   section.setSubTotal(data.subTotal);
  //   return section;
  // }



  public static getPayment(req: any): Payment {
    let payment = new Payment();
    payment.setAccountId(req.accountId);
    payment.setCustomerId(req.customerId);
    payment.setUsedPointsAmount(+req.usedPointsAmount);
    payment.setEligiblePointsAmount(+req.eligiblePointsAmount);
    payment.setOrderId(req.orderId);
    payment.setPaymentCurrency(req.paymentCurrency);
    payment.setPostPaymentRefId(req.postPaymentRefId);
    payment.setPaymentGatewaySignature(req.paymentGatewaySignature);
    payment.setPaymentGatewayRefId(req.paymentGatewayRefId);
    payment.setPaymentAmount(+req.paymentAmount);
    payment.setPaymentStatus(req.paymentStatus);
    payment.setAutoCapturePayment(req.autoCapturePayment != undefined ? req.autoCapturePayment : false);
    payment.setMenewPayPayment(req.menewPayPayment != undefined ? req.menewPayPayment : false);
    payment.setPaymentStatus(req.paymentStatus);
    payment.setCurrency(req.currency);
    payment.setId(req.id);
    return payment;
  }


  public static getPaymentV1(req: any): PaymentWebhookRespone {
    let payment = new PaymentWebhookRespone();
    payment.setPaymentAccountId(req.account_id)
    payment.setEvent(req.event)
    if (req.payload && req.payload.payment && req.payload.payment.entity) {
      let entity = req.payload.payment.entity;
      payment.setPaymentId(entity.id)
      payment.setEventStatus(entity.status)
      payment.setEntity(entity.entity)
      payment.setAmount(entity.amount)
      payment.setCurrency(entity.currency)
      payment.setPaymentStatus(entity.status)
      payment.setPaymentOrderId(entity.order_id)
      payment.setInvoiceId(entity.invoice_id)
      payment.setInternational(entity.international)
      payment.setMethod(entity.method)
      payment.setAmountRefunded(entity.amount_refunded)
      payment.setRefundStatus(entity.refund_status)
      payment.setCaptured(entity.captured)
      payment.setDescription(entity.description)
      payment.setCardId(entity.card_id)
      payment.setBank(entity.bank)
      payment.setWallet(entity.wallet)
      payment.setVpa(entity.vpa)
      payment.setEmail(entity.email)
      payment.setContact(entity.contact)
      if (isNaN(parseFloat(entity.fee)) == false) {
        payment.setFee(parseFloat(entity.fee) / 100)
      } else {

        payment.setFee(entity.fee)
      }
      if (isNaN(parseFloat(entity.tax)) == false) {
        payment.setTax(parseFloat(entity.tax) / 100)
      } else {
        payment.setTax(entity.tax)
      }
      payment.setErrorCode(entity.error_code)
      payment.setErrorDescription(entity.error_description)
      payment.setErrorSource(entity.error_source)
      payment.setErrorStep(entity.error_step)
      payment.setErrorReason(entity.error_reason)
      payment.setPaymentCreatedAt(entity.created_at)
      if (entity.acquirer_data) {
        payment.setEntity(entity.acquirer_data.bank_transaction_id)

      }

    }

    return payment;
  }
  public static dbToCountryList(dbCountryList: any): Array<Country> {
    if (dbCountryList != undefined && dbCountryList.length > 0) {
      return Utility.getListOfItems(dbCountryList, Utility.dbToCountry);
    } else {
      return []
    }
  }
  public static dbToCountry(dbCountry: any): Country {
    let country = new Country();
    country.setCountryName(dbCountry.countryName ? dbCountry.countryName : "");
    country.setName(dbCountry.name ? dbCountry.name : "");
    country.setId(dbCountry.id ? dbCountry.id : "");
    country.setCapital(dbCountry.capital ? dbCountry.capital : "");
    country.setCurrency(dbCountry.currency ? dbCountry.currency : "");
    country.setIso2(dbCountry.iso2 ? dbCountry.iso2 : "");
    country.setIso3(dbCountry.iso3 ? dbCountry.iso3 : "");
    country.setCurrency_symbol(dbCountry.currency_symbol ? dbCountry.currency_symbol : "");
    country.setPhone_code(dbCountry.phone_code ? dbCountry.phone_code : "");
    country.setNative(dbCountry.native ? dbCountry.native : "");

    return country;
  }
  public static getOrderAuditLog(log): OrderAuditLog {
    let auditLog: OrderAuditLog = new OrderAuditLog();
    log.orderId && auditLog.setOrderId(log.orderId);
    log.event && auditLog.setEvent(log.event);
    log.employeeType && auditLog.setEmployeeType(log.employeeType);
    log.employeeName && auditLog.setEmployeeName(log.employeeName);
    log.employeeId && auditLog.setEmployeeId(log.employeeId);
    log.createdAt && auditLog.setCreatedAt(log.createdAt);

    return auditLog;
  }
  public static getECommerceCommisionSettingsBaseModel(data): ECommerceCommisionSettingsBaseModel {
    let model: ECommerceCommisionSettingsBaseModel = new ECommerceCommisionSettingsBaseModel();
    if (!data) {
      return model;
    }
    if (data.userCommisionSettings != undefined && data.userCommisionSettings.fixedFee != undefined) {
      model.setUserCommisionSettings(EcommerceUtility.getECommerceCommisionSettingsModel(data.userCommisionSettings))
    }
    if (data.businessCommisionSettings != undefined && data.businessCommisionSettings.fixedFee != undefined) {
      model.setBusinessCommisionSettings(EcommerceUtility.getECommerceCommisionSettingsModel(data.businessCommisionSettings))
    }


    Utility.setServiceObjectProperties(model, data);
    return model;
  }
  public static getECommerceCommisionSettingsModel(data): ECommerceCommisionSettingsModel {
    let model = new ECommerceCommisionSettingsModel();
    model.setFixedFee(data.fixedFee != undefined ? data.fixedFee : 0)
    model.setIhf(data.ihf != undefined ? data.ihf : 0)
    model.setPercentage(data.percentage != undefined ? data.percentage : 0)
    return model
  }
  public static getDiscountCoupon(data): DiscountCouponModel {
    let promotion: DiscountCouponModel = new DiscountCouponModel();
    promotion.setId(data.id ? data.id : data._id);
    promotion.setName(data.name);
    promotion.setStatus(data.status);
    promotion.setCreatedAt(data.createdAt);
    promotion.setLastModifiedAt(data.updatedAt);
    promotion.setEnable(data.enable);
    promotion.setStartDate(data.startDate);
    promotion.setEndDate(data.endDate);
    promotion.setBusinessId(data.businessId);
    promotion.setCreatedBy(data.createdBy);
    promotion.setDontShowToCustomer(data.dontShowToCustomer);


    let discountType: DiscountType = Utils.parseDefaultEnum(data.discountType, DiscountType, DiscountType.Unknown);
    promotion.setDiscountType(discountType);
    promotion.setDiscountMetadata(Utility.getDiscountMetaData(data.discountMetadata, discountType));
    promotion.setOrderTypes(data.orderTypes ? data.orderTypes : []);
    promotion.setUsageLimit(data.usageLimit);
    promotion.setPerCustomerUsage(data.perCustomerUsage);
    promotion.setLimitTotalUsage(data.limitTotalUsage);
    promotion.setActualUsage(data.actualUsage);
    promotion.setUnusableCount(data.unusableCount);
    // if (promotion.getPromotionType() === PromotionType.automatic && (data.scheduleDays && data.scheduleDays.length > 0)) {
    // promotion.setScheduleDays(Utility.getListOfItems(data.scheduleDays, Utility.getSchedule));
    // }
    promotion.setSummaryCardList(data.summaryCardList);
    return promotion;
  }
  public static getDiscountMetaData(data, discountType): DiscountBase {
    let discountBase = null;
    if (discountType === DiscountType.Percentage) {
      discountBase = new PercentageDiscount();
      let maximumDiscountAmount = 0;
      if (!isNaN(parseFloat(data.maximumDiscountAmount))) {
        maximumDiscountAmount = parseFloat(data.maximumDiscountAmount)
      }
      discountBase.setMaximumDiscountAmount(maximumDiscountAmount);
      const fixedAmount = Utility.setBasicFixedDiscountBaseProperties(data);
      discountBase.setValue(fixedAmount.getValue());
      discountBase.setDishEligibility(fixedAmount.getDishEligibility());
      discountBase.setMinimumOrderRequirement(fixedAmount.getMinimumOrderRequirement());
      discountBase.setMinimumOrderRequirementType(fixedAmount.getMinimumOrderRequirementType());
    }
    else if (discountType == DiscountType.FixedAmount) {
      discountBase = new FixedAmountDiscount();
      const fixedAmount = Utility.setBasicFixedDiscountBaseProperties(data);
      discountBase.setValue(fixedAmount.getValue());
      discountBase.setDishEligibility(fixedAmount.getDishEligibility());
      discountBase.setMinimumOrderRequirement(fixedAmount.getMinimumOrderRequirement());
      discountBase.setMinimumOrderRequirementType(fixedAmount.getMinimumOrderRequirementType());
    } else if (discountType === DiscountType.BuyXGetY) {
      discountBase = new BuyXGetYDiscount();
      // discountBase.setBuyItems(data.buyItems ? Utility.getDishEligibility(data.buyItems) : []);
      // discountBase.setGetItems(data.getItems ? Utility.getDishEligibility(data.getItems) : []);
      discountBase.setBuyQuantity(data.buyQuantity);
      discountBase.setGetQuantity(data.getQuantity);
      discountBase.setPercentageDiscount(data.percentageDiscount);
      discountBase.setIsFree(data.isFree);
      discountBase.setIsMultipleUsageAllowed(data.isMultipleUsageAllowed);
      discountBase.setMaximumAllowedUsage(data.maximumAllowedUsage);
    }
    return discountBase;
  }
  public static setBasicFixedDiscountBaseProperties(data): FixedAmountDiscount {
    let fixedAmountDiscount: FixedAmountDiscount = new FixedAmountDiscount();
    if (isNaN(parseFloat(data.value)) == false) {
      data.value = parseFloat(data.value);
    }
    fixedAmountDiscount.setValue(data.value);
    fixedAmountDiscount.setDishEligibility(Utility.getDishEligibility(data.dishEligibility));
    let reqType = Utils.parseDefaultEnum(data.minimumOrderRequirementType, MinimumOrderRequirementType, MinimumOrderRequirementType.none);
    if (reqType !== MinimumOrderRequirementType.none) {

      if (isNaN(parseFloat(data.minimumOrderRequirement)) == false) {
        data.minimumOrderRequirement = parseFloat(data.minimumOrderRequirement);
      }
      fixedAmountDiscount.setMinimumOrderRequirement(data.minimumOrderRequirement);
    }
    fixedAmountDiscount.setMinimumOrderRequirementType(reqType);
    return fixedAmountDiscount;
  }


  public static getDishEligibility(data): DishEligibility {
    let dishEligibility: DishEligibility = new DishEligibility();
    let type = Utils.parseDefaultEnum(data.eligilibityType, DishEligibilityType, DishEligibilityType.order);
    dishEligibility.setEligilibityType(type);
    if (type === DishEligibilityType.item) {
      dishEligibility.setProductIds(data.productIds);
    } else if (type === DishEligibilityType.category) {
      dishEligibility.setCategoryIds(data.categoryIds);
    }
    return dishEligibility;
  }
}
