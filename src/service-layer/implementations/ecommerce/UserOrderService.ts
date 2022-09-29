import * as moment from 'moment';
import { ServiceFactory } from '../../../service-layer/ServiceFactory';
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { Utils } from "../../../common/utils/Utils";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IBusinessDBManager } from "../../../db-layer/interfaces/ecommerce/IBusinessDBManager";
import { IOrderDBManager } from "../../../db-layer/interfaces/ecommerce/IOrderDBManager";
import { IProductsDBManager } from "../../../db-layer/interfaces/ecommerce/IProductsDBManager";
import { IUserDeliveryAddressDBManager } from "../../../db-layer/interfaces/ecommerce/IUserDeliveryAddressDBManager";
import { IUserOrderService } from "../../../service-layer/interfaces/ecommerce/IUserOrderService";
import { CustomerOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";
import { OrderProductsModel } from "../../../service-layer/models/ecommerce/OrderProductsModel";
import { OrderCreatedFrom, OrderPaymentType, OrderStatusEnum } from "../../../service-layer/models/ecommerce/OrderStatusEnum";
import { OrderTypeEnum } from "../../../service-layer/models/ecommerce/OrderTypeEnum";
import { BusinessCurrencyModel, BusinessDeliverySettings, BusinessResponseModel } from "../../../service-layer/models/ecommerce/response/BusinessResponseModel";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { CreateOrderRequestModel } from "../../../web-layer/models/ecommerce/request/CreateOrderRequestModel";
import { GetUserOrderRequestModel } from "../../../web-layer/models/ecommerce/request/GetUserOrderRequestModel";
import { RescheduleAppointmentModel } from "../../../web-layer/models/ecommerce/request/RescheduleAppointmentModel";
import { UserDeliveryAddressModel } from "../../models/ecommerce/response/UserDeliveryAddressModel";
import { IECommerceCommisionSettingsDBManager } from '../../../db-layer/interfaces/ecommerce/IECommerceCommisionSettingsDBManager';
import { ECommerceCommisionSettingsModel } from '../../../service-layer/models/ecommerce/response/ECommerceCommisionSettingsBaseModel';
import { IDiscountService } from '../../../service-layer/interfaces/ecommerce/IDiscountService';


var converter = require('number-to-words');
const { readFile } = require('fs/promises')

export class UserOrderService implements IUserOrderService {
    private readonly productsDBManager: IProductsDBManager;
    private readonly dbManager: IUserDeliveryAddressDBManager;
    private readonly orderDBManager: IOrderDBManager;
    private readonly businessDBManager: IBusinessDBManager;
    private readonly commisionSettingsDBManager: IECommerceCommisionSettingsDBManager;
    private readonly discountService: IDiscountService;

    constructor() {
        this.commisionSettingsDBManager = DBManagerFactory.getCommisionSettingsDBManager();
        this.dbManager = DBManagerFactory.getUserDeliveryAddressDBManager();
        this.productsDBManager = DBManagerFactory.getProductsDBManager();
        this.orderDBManager = DBManagerFactory.getOrderDBManager();
        this.businessDBManager = DBManagerFactory.getBusinessDBManager();
        this.discountService = ServiceFactory.getDiscountService();

    }

    public async updateAppointment(data: CustomerOrderModel): Promise<CustomerOrderModel> {
        return await this.orderDBManager.updateAppointment(data);
    }
    public async rescheduleAppointmentBusiness(data: RescheduleAppointmentModel): Promise<CustomerOrderModel> {
        return await this.orderDBManager.rescheduleAppointmentBusiness(data);
    }
    public async updateChannelOrderStatus(orderId: string, status: OrderStatusEnum): Promise<CustomerOrderModel> {
        return await this.orderDBManager.updateChannelOrderStatus(orderId, status);
    }
    public async updateOrderPaymentStatus(orderId: string, order: CustomerOrderModel): Promise<CustomerOrderModel> {
        return await this.orderDBManager.updateOrderPaymentStatus(orderId, order);
    }

    public async getOrderDetailsByOrderId(orderId: string): Promise<CustomerOrderModel> {
        return await this.orderDBManager.getOrderDetailsByOrderId(orderId);
    }

    public async getUserOrders(data: GetUserOrderRequestModel): Promise<ResultModel> {
        return await this.orderDBManager.getUserOrders(data)
    }
    public async getBusinessOrderDetailsByOrderId(orderId: string): Promise<CustomerOrderModel> {
        return await this.orderDBManager.getBusinessOrderDetailsByOrderId(orderId);
    }
    public async getBusinessOrders(data: GetUserOrderRequestModel): Promise<ResultModel> {
        return await this.orderDBManager.getBusinessOrders(data)
    }

    public async validateOrder(data: CreateOrderRequestModel): Promise<CustomerOrderModel> {

        let businessId = data.businessId;
        if (businessId == undefined || businessId.trim() == "") {
            throw new MyError("Business Id Not Found")
        }

        let order = EcommerceUtility.getUserOrderDataModel(data);

        let busines: BusinessResponseModel;//= await this.businessDBManager.getAndUpdateOrderSequenceNumber(businessId);
        busines = await this.businessDBManager.getAndUpdateOrderSequenceNumber(businessId);
        if (data.userId == undefined || data.userId == "") {
            throw new MyError("User id is reuired field.");
        } else if (order.getOrderType() == OrderTypeEnum.HomeDelivery.toString() && (data.addressId == undefined || data.addressId == "")) {
            throw new MyError("Delivery address details are missing.")
        }
        if (order.getOrderType() == OrderTypeEnum.HomeDelivery) {
            order.setDeliveryAddress(await this.dbManager.getUserDeliveryAddressById(data.addressId))
        } else {
            order.setDeliveryAddress(null);
        }
        if (busines == undefined) {
            throw new MyError("Business Not Found")
        }

        let primaryCurrency = EcommerceUtility.getPrimaryCurrency(busines);
        let selectedCurrency = EcommerceUtility.getSelectedCurrency(busines, primaryCurrency, data.currency);





        // order.getInCarDeliveryInfo
        order.setProducts((await this.validateAndRectifyCreateOrderProducts(order.getProducts(), selectedCurrency)));
        // let businessId = data.businessId;
        if (order.getProducts() && order.getProducts()[0]) {
            businessId = order.getProducts()[0].getBusinessId();
        } else {
            throw new MyError("Add at least one product in cart")
        }
        if (businessId == undefined || businessId == "") {
            throw new MyError("Business Id Not Found")
        }
        order.setBusinessId(businessId)
        order.setCurrency(selectedCurrency.getCurrency());
        order.setCurrencySymbol(selectedCurrency.getCurrencySymbol());
        order.setCurrencyConversion(selectedCurrency.getCurrencyConversion());
        if (busines.getDeliverySettings()) {
            order = await this.calculateDeliveryCharges(order, busines);
            if (order.getOrderType() != OrderTypeEnum.HomeDelivery) {
                order = await this.calculatePackingCharges(order, busines);
            }
        }
        order = await this.validateAndRectifyCreateOrder(order)
        if (data.couponCode != undefined && data.couponCode != null && data.couponCode != "" && data.couponCode.trim().length > 0) {
            order = await this.discountService.applyCouponPromotionV1(order, data.couponCode, false)
            await this.validateAndRectifyCreateOrderAfterDiscount(order)
        }
        // order = await this.validateAndRectifyCreateOrder(order)
        return order;

    }


    public async createOrder(data: CreateOrderRequestModel, isUpdateOrder?: boolean): Promise<CustomerOrderModel> {

        let businessId = data.businessId;

        if (businessId == undefined || businessId.trim() == "") {
            throw new MyError("Business Id Not Found")
        }

        let order = EcommerceUtility.getUserOrderDataModel(data);

        let busines: BusinessResponseModel;//= await this.businessDBManager.getAndUpdateOrderSequenceNumber(businessId);
        if (isUpdateOrder == undefined || isUpdateOrder == false) {
            busines = await this.businessDBManager.getAndUpdateOrderSequenceNumber(businessId);

            if (data.userId == undefined || data.userId == "") {
                throw new MyError("User id is reuired field.");
            } else if (order.getOrderType() == OrderTypeEnum.HomeDelivery.toString() && (data.addressId == undefined || data.addressId == "")) {
                throw new MyError("Delivery address details are missing.")
            }
            if (order.getOrderType() == OrderTypeEnum.HomeDelivery) {
                order.setDeliveryAddress(await this.dbManager.getUserDeliveryAddressById(data.addressId))
            } else {
                order.setDeliveryAddress(null);
            }

        } else {
            busines = await this.businessDBManager.getBusinessById(businessId);
        }
        if (busines == undefined) {
            throw new MyError("Business Not Found")
        }
        let primaryCurrency = EcommerceUtility.getPrimaryCurrency(busines);
        let selectedCurrency = EcommerceUtility.getSelectedCurrency(busines, primaryCurrency, data.currency);





        // order.getInCarDeliveryInfo
        order.setProducts((await this.validateAndRectifyCreateOrderProducts(order.getProducts(), selectedCurrency)));
        // let businessId = data.businessId;
        if (order.getProducts() && order.getProducts()[0]) {
            businessId = order.getProducts()[0].getBusinessId();
        } else {
            throw new MyError("Add at least one product in cart")
        }
        if (businessId == undefined || businessId == "") {
            throw new MyError("Business Id Not Found")
        }

        if (isUpdateOrder == undefined || isUpdateOrder == false) {

            let billSeq = busines.getOrderSequenceNumber();
            let billSeqString = billSeq < 10 ? `000${billSeq}` : billSeq < 100 ? `00${billSeq}` : billSeq < 1000 ? `0${billSeq}` : billSeq;
            let billNumber = `${busines.getOrderSequenceNumberPrefix()}${Utils.getNumericString(3)}-${billSeqString}`
            order.setBusinessId(businessId)
            order.setBillNumber(billNumber)
            order.setCurrency(selectedCurrency.getCurrency());
            order.setCurrencySymbol(selectedCurrency.getCurrencySymbol());
            order.setCurrencyConversion(selectedCurrency.getCurrencyConversion());
        }
        if (busines.getDeliverySettings()) {
            let deliverySettings = busines.getDeliverySettings();
            order = await this.calculateDeliveryCharges(order, busines);
            if (order.getOrderType() != OrderTypeEnum.HomeDelivery) {
                order = await this.calculatePackingCharges(order, busines);
            }
        }
        order = await this.validateAndRectifyCreateOrder(order)
        if (data.couponCode != undefined && data.couponCode != null && data.couponCode != "" && data.couponCode.trim().length > 0) {
            order = await this.discountService.applyCouponPromotionV1(order, data.couponCode, false)
            await this.validateAndRectifyCreateOrderAfterDiscount(order)
        }
        if (isUpdateOrder == undefined || isUpdateOrder == false) {
            if (data.fromBusiness != undefined && data.fromBusiness == true) {
                order.setCreatedFrom(OrderCreatedFrom.Business);
                order.setEmployeeId(data.employeeId)
                order.setEmployeeName(data.employeeName)
            } else {
                order.setCreatedFrom(OrderCreatedFrom.User);
            }
            return await this.orderDBManager.createOrder(order);
        } else {
            order.setId(data.id)
            if (order.getId() == undefined || order.getId() == "") {
                throw new MyError("Order id is required field")
            }
            return await this.orderDBManager.updateOrder(order);

        }

    }

    private async validateAndRectifyCreateOrder(order: CustomerOrderModel): Promise<CustomerOrderModel> {

        let subTotal = 0;
        let totalTax = 0;
        let totalBill = 0;
        let packingCharges = order.getPackingCharges();
        let deliveryCharges = order.getDeliveryCharges();
        let userFee = order.getExtraFeeUser();
        // userFee = 10.5;
        let businessFee = order.getExtraFeeBusiness();
        for (let p of order.getProducts()) {
            let productSubTotal = p.getSubTotal();
            subTotal += productSubTotal;
            totalTax += p.getTaxAmount();
            // packingCharges += p.getPackingCharges();
            // deliveryCharges += p.getDeliveryCharges();

        }

        subTotal = parseFloat((subTotal).toFixed(2))
        totalTax = parseFloat((totalTax).toFixed(2))
        packingCharges = parseFloat((packingCharges).toFixed(2))
        deliveryCharges = parseFloat((deliveryCharges).toFixed(2))
        totalBill = subTotal + totalTax + packingCharges + deliveryCharges;
        totalBill = parseFloat((totalBill).toFixed(2))
        order.setTotalBill(totalBill);
        let commisionSettings = await this.commisionSettingsDBManager.getCommisionSettings();
        if (commisionSettings && commisionSettings.getUserCommisionSettings()) {
            userFee = await this.calculateCommision(order, commisionSettings.getUserCommisionSettings())
        }
        if (commisionSettings && commisionSettings.getBusinessCommisionSettings()) {
            businessFee = await this.calculateCommision(order, commisionSettings.getBusinessCommisionSettings())
        }
        totalBill = parseFloat((order.getTotalBill()).toFixed(2))
        order.setTotalBill(parseFloat((order.getTotalBill() + userFee).toFixed(2)));

        order.setSubTotal(subTotal);
        order.setExtraFeeBusiness(businessFee)
        order.setExtraFeeUser(userFee)
        order.setDeliveryCharges(deliveryCharges);
        order.setPackingCharges(packingCharges);
        order.setTotalTax(totalTax);

        return order;
    }

    private async validateAndRectifyCreateOrderAfterDiscount(order: CustomerOrderModel): Promise<CustomerOrderModel> {

        let discount = 0;
        if (order.getCustomDiscount() && order.getCustomDiscount().getAmount() != undefined && order.getCustomDiscount().getAmount() > 0) {
            discount = order.getCustomDiscount().getAmount()
        }

        let totalBill = order.getTotalBill();

        let userFee = order.getExtraFeeUser();


        let businessFee = order.getExtraFeeBusiness();
        totalBill = totalBill - discount



        order.setTotalBill(totalBill);
        order.setTotalDiscount(discount);
        let commisionSettings = await this.commisionSettingsDBManager.getCommisionSettings();
        if (commisionSettings && commisionSettings.getUserCommisionSettings()) {
            userFee = await this.calculateCommision(order, commisionSettings.getUserCommisionSettings())
        }
        if (commisionSettings && commisionSettings.getBusinessCommisionSettings()) {
            businessFee = await this.calculateCommision(order, commisionSettings.getBusinessCommisionSettings())
        }
        totalBill = parseFloat((order.getTotalBill()).toFixed(2))
        order.setTotalBill(parseFloat((order.getTotalBill() + userFee).toFixed(2)));
        order.setExtraFeeBusiness(businessFee)
        order.setExtraFeeUser(userFee)
        return order;
    }
    private async calculateCommision(order: CustomerOrderModel, commisionSettings: ECommerceCommisionSettingsModel): Promise<number> {
        let fee = 0;
        if (commisionSettings.getFixedFee() > 0) {
            fee += commisionSettings.getFixedFee()
        }
        if (order.getPaymentType() == OrderPaymentType.ONLINE && commisionSettings.getIhf() > 0) {
            let ihf = (commisionSettings.getIhf() * 0.01) * order.getTotalBill()
            fee += ihf
        }
        if (commisionSettings.getPercentage() > 0) {
            let percetage = (commisionSettings.getPercentage() * 0.01) * order.getTotalBill()
            fee += percetage
        }
        fee = parseFloat(fee.toFixed(2))
        return fee
    }
    private async calculatePackingCharges(order: CustomerOrderModel, business: BusinessResponseModel): Promise<CustomerOrderModel> {
        let deliverySettings = business.getDeliverySettings();
        order.setPackingCharges(0)
        if (order.getOrderType() == OrderTypeEnum.CarDelivery) {
            if (deliverySettings.isPackagingChargesPerItemsICD() == false) {
                order.setPackingCharges(deliverySettings.getPackagingChargesICD())
            } else {
                order.setPackingCharges(order.getProducts().length * deliverySettings.getPackagingChargesICD())
            }
        }
        if (order.getOrderType() == OrderTypeEnum.Appointment) {

        }
        if (order.getOrderType() == OrderTypeEnum.StorePickup) {
            if (deliverySettings.isPackagingChargesPerItemsISP() == false) {
                order.setPackingCharges(deliverySettings.getPackagingChargesISP())
            } else {
                order.setPackingCharges(order.getProducts().length * deliverySettings.getPackagingChargesISP())
            }
        }
        return order;
    }
    private async calculateDeliveryCharges(order: CustomerOrderModel, business: BusinessResponseModel): Promise<CustomerOrderModel> {
        let deliverySettings = business.getDeliverySettings();
        order.setDeliveryCharges(0)
        order.setPackingCharges(0)
        let calculateDeliveryCharges = false
        let freeHomeDelivery = deliverySettings.isFreeHomeDelivery()
        if (freeHomeDelivery) {
            if (deliverySettings.getFreeHomeDeliveryOrderAmount() > 0 && (order.getSubTotal() - order.getTotalDiscount()) < deliverySettings.getFreeHomeDeliveryOrderAmount()) {

                if (deliverySettings.isHomeDeliveryChargesEnabled()) {
                    calculateDeliveryCharges = true
                }
            }
        }
        let totalProductWeight = 0;
        let totalQuantity = 0;
        if (calculateDeliveryCharges) {

            for (let p of order.getProducts()) {
                totalProductWeight += (p.getProductWeight() * p.getQuantity())
            }
            let deliveryCharges = 0
            let homeDeliveryCharges = deliverySettings.getHomeDeliveryCharges();
            let baseWeight = homeDeliveryCharges.getBaseWeight()
            let baseWeightDiff = totalProductWeight - baseWeight;
            deliveryCharges = homeDeliveryCharges.getBaseWeightCharges();
            if (baseWeightDiff > 0) {
                let extra = baseWeightDiff * homeDeliveryCharges.getExtraPerKG()
                deliveryCharges += extra;
            }
            deliveryCharges = deliveryCharges * 1.0
            order.setDeliveryCharges(deliveryCharges);
        }
        if (deliverySettings.isPackagingChargesPerItems() == false) {
            order.setPackingCharges(deliverySettings.getPackagingCharges())
        } else {
            order.setPackingCharges(order.getProducts().length * deliverySettings.getPackagingCharges())
        }

        if (order.getDeliveryAddress() != undefined && order.getDeliveryAddress().getLatitude() != undefined && order.getDeliveryAddress().getLongitude() != undefined) {
            let deliveryCharges = order.getDeliveryCharges();
            deliveryCharges += deliverySettings.getHomeDeliveryCharges().getBaseDistanceCharges()
            let baseDistance = deliverySettings.getHomeDeliveryCharges().getBaseDistance();

            let businessLatitude = business.getLatitude()
            let businessLongitude = business.getLongitude()
            let distance = 0;

        }

        return order;
    }
    private async validateAndRectifyCreateOrderProducts(products: Array<OrderProductsModel>, selectedCurrency: BusinessCurrencyModel): Promise<Array<OrderProductsModel>> {



        let productId = [];
        let variantIdArray = [];
        for (let p of products) {
            if (p.getVariantId() != undefined && p.getVariantId().trim() != "") {
                variantIdArray.push(p.getVariantId());
            } else {
                if (p.getProductId() != undefined && p.getProductId())
                    productId.push(p.getProductId());
            }
        }

        let arrVariants = await this.productsDBManager.getAllVariantsByVariantIdArray(variantIdArray);
        let arrProducts = await this.productsDBManager.getAllProductsByProductIdArray(productId);
        let newArray = [];
        for (let variantFromDB of arrVariants) {
            let product = products.find(p => p.getVariantId() == variantFromDB.getVariantId());
            if (product) {
                if (variantFromDB.isAppointmentRequired() == false && variantFromDB.isEnableInventory() == true && variantFromDB.getQuantityAvailable() < product.getQuantity()) {
                    throw new MyError(`${variantFromDB.getProductName()}-${variantFromDB.getVariantName()} is out of stock`)
                }
                product = await this.calculateProductPrice(variantFromDB, product, selectedCurrency)
                newArray.push(product);
            }
        }

        for (let productFromDB of arrProducts) {
            let product = products.find(p => p.getProductId() == productFromDB.getProductId() && (p.getVariantId() == undefined || p.getVariantId().trim() == ""));
            if (productFromDB.isAppointmentRequired() == false && productFromDB.isEnableInventory() == true && productFromDB.getQuantityAvailable() < product.getQuantity()) {
                throw new MyError(`${productFromDB.getProductName()} is out of stock`)
            }
            if (product) {
                product = await this.calculateProductPrice(productFromDB, product, selectedCurrency)
                newArray.push(product);
            }
        }

        return newArray;
    }

    private async calculateProductPrice(variant: CartResponseModel, product: OrderProductsModel, selectedCurrency: BusinessCurrencyModel): Promise<OrderProductsModel> {
        product.setCurrency(selectedCurrency.getCurrency());
        product.setCurrencySymbol(selectedCurrency.getCurrencySymbol());
        product.setCurrencyConversion(selectedCurrency.getCurrencyConversion());
        product.setMrp(parseFloat((variant.getMrp() * selectedCurrency.getCurrencyConversion()).toFixed(2)));
        product.setSellingPrice(parseFloat((variant.getSellingPrice() * selectedCurrency.getCurrencyConversion()).toFixed(2)));
        product.setUpdateInventory(variant.isEnableInventory() != undefined ? variant.isEnableInventory() : false);

        let subtotal = product.getSellingPrice() * product.getQuantity()
        subtotal = parseFloat(subtotal.toFixed())
        product.setSubTotal(subtotal);
        product.setTax(variant.getGstRate());

        let taxAmount = subtotal * (product.getTax() / 100)
        taxAmount = parseFloat((taxAmount).toFixed(2))
        product.setTaxAmount(taxAmount);

        product.setTotalAmount(parseFloat((subtotal + taxAmount).toFixed(2)))
        product.setProductName(variant.getProductName())
        product.setVariantName(variant.getVariantName())
        product.setBusinessId(variant.getBusinessId())
        product.setProductWeight(variant.getProductWeight())
        product.setCategoryId(variant.getCategoryId())
        return product;
        // parseFloat(().toFixed(2))
    }


    public async addNewDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel> {
        return this.dbManager.addNewDeliveryAddress(data);
    }
    public async deleteUserDeliveryAddress(userId: string, id: string): Promise<UserDeliveryAddressModel> {
        return await this.dbManager.deleteUserDeliveryAddress(userId, id)

    }
    public async getAllDeliveryAddressOfUser(userId: string): Promise<Array<UserDeliveryAddressModel>> {
        return await this.dbManager.getAllDeliveryAddressOfUser(userId)
    }
    public async getUserDeliveryAddressById(id: string): Promise<UserDeliveryAddressModel> {
        return await this.dbManager.getUserDeliveryAddressById(id);
    }
    public async sendOrderInvoice(orderId: string, sendEmail: boolean, emailId?: string): Promise<any> {
        const order = await this.getBusinessOrderDetailsByOrderId(orderId)
        // let basePath = "D:\\_Projects\\_EFuel\\_Node\\efuel-backend-2022\\src\\common\\utils\\ecommerce\\";
        let basePath = "/home/ec2-user/efuel-backend-2022/src/common/utils/ecommerce/";

        let invoiceHTML = await readFile(basePath + "Invoice_bck.html", 'utf8')
        let invoiceProductRow = await readFile(basePath + "Invoice_products.html", 'utf8')
        invoiceHTML = invoiceHTML.replace(/\n/g, '')
        // var root = HTMLParser.parse(x);

        let user = order.getUser()
        let address = order.getDeliveryAddress()
        let business = await this.businessDBManager.getBusinessById(order.getBusinessId());
        let businessAddress = `${business.getAddressLine1()}, ${business.getCity()}, ${business.getState()} - ${business.getZipCode()}`
        let userAddress = `${business.getAddressLine1()}, ${business.getCity()}, ${business.getState()} - ${business.getZipCode()}`

        invoiceHTML = invoiceHTML.replace(/{sellerGST}/g, business.getGstNumber())
        invoiceHTML = invoiceHTML.replace(/{sellerName}/g, business.getBusinessName())
        invoiceHTML = invoiceHTML.replace(/{sellerAddress}/g, businessAddress)
        invoiceHTML = invoiceHTML.replace(/{sellerCountry}/g, business.getCountry().toUpperCase())

        invoiceHTML = invoiceHTML.replace(/{buyerName}/g, `${user.getFirstName()} ${user.getLastName()}`)
        if (address != undefined) {

            invoiceHTML = invoiceHTML.replace(/{buyerAddress1}/g, `${address.getAddressLine1()}, ${address.getAddressLine1()}, ${address.getLocality()}`)
            invoiceHTML = invoiceHTML.replace(/{buyerAddress2}/g, `${address.getCity()}, ${address.getState()}, ${address.getZipCode()}`)
            invoiceHTML = invoiceHTML.replace(/{buyerCountry}/g, `${address.getCountry().toUpperCase()}`)
            invoiceHTML = invoiceHTML.replace(/{buyerState}/g, `${address.getState().toUpperCase()}`)
        } else {
            invoiceHTML = invoiceHTML.replace(/{buyerAddress1}/g, ``)
            invoiceHTML = invoiceHTML.replace(/{buyerAddress2}/g, ``)
            invoiceHTML = invoiceHTML.replace(/{buyerCountry}/g, ``)
            invoiceHTML = invoiceHTML.replace(/{buyerState}/g, ``)
        }


        invoiceHTML = invoiceHTML.replace(/{sellerState}/g, `${business.getState().toUpperCase()}`)

        invoiceHTML = invoiceHTML.replace(/{billNumber}/g, `${order.getBillNumber().toUpperCase()}`)
        invoiceHTML = invoiceHTML.replace(/{billDate}/g, `${moment(order.getCreatedAt()).format('DD MMM YYYY hh:mm a')}`)

        invoiceHTML = invoiceHTML.replace(/{totalBill}/g, `${order.getCurrencySymbol()} ${(order.getTotalBill()).toFixed(2)}`)
        invoiceHTML = invoiceHTML.replace(/{totalTax}/g, `${order.getCurrencySymbol()} ${order.getTotalTax().toFixed(2)}`)
        invoiceHTML = invoiceHTML.replace(/{deliveryCharges}/g, `${order.getCurrencySymbol()} ${order.getDeliveryCharges().toFixed(2)}`)
        invoiceHTML = invoiceHTML.replace(/{packingCharges}/g, `${order.getCurrencySymbol()} ${order.getPackingCharges().toFixed(2)}`)
        invoiceHTML = invoiceHTML.replace(/{convenienceFee}/g, `${order.getCurrencySymbol()} ${order.getExtraFeeUser().toFixed(2)}`)
        invoiceHTML = invoiceHTML.replace(/{discount}/g, `${order.getCurrencySymbol()} ${order.getTotalDiscount().toFixed(2)}`)
        invoiceHTML = invoiceHTML.replace(/{subTotal}/g, `${order.getCurrencySymbol()} ${order.getSubTotal().toFixed(2)}`)

        invoiceHTML = invoiceHTML.replace(/{totalBillINWords}/g, `${order.getCurrency().toUpperCase()} ${converter.toWords(order.getTotalBill()).toUpperCase()}`)

        let products = order.getProducts();
        let productsHTMLRows = [];

        let sr = 1;
        for (let p of products) {
            let row = invoiceProductRow;
            row = row.replace(/{pNo}/g, productsHTMLRows.length + 1)
            row = row.replace(/{productName}/g, `${p.getProductName()} ${p.getVariantName()}`)
            row = row.replace(/{productSubTotal}/g, `${p.getCurrencySymbol()} ${p.getSubTotal()}`)
            row = row.replace(/{productPrice}/g, `${p.getCurrencySymbol()} ${p.getSellingPrice()}`)
            row = row.replace(/{productTax}/g, `${p.getTax()}%`)
            row = row.replace(/{productTaxAmount}/g, `${p.getCurrencySymbol()} ${p.getTaxAmount()}`)
            row = row.replace(/{productQty}/g, `${p.getQuantity()}`)
            row = row.replace(/{productTotal}/g, `${p.getCurrencySymbol()} ${p.getTotalAmount()}`)
            productsHTMLRows.push(row)

        }
        let xxx = productsHTMLRows.join("  ")
        invoiceHTML = invoiceHTML.replace(/{productRows}/g, xxx)
        // invoiceHTML = invoiceHTML.replace(/\\n/g, '')
        if (sendEmail == true) {

            invoiceHTML = invoiceHTML.replace(/\n/g, '')
            if (emailId == undefined || emailId == "") {
                emailId = "manjeetbrar91@gmail.com";
            }
            ServiceFactory.getEmailProviderSMTP().sendHTMLEmail([emailId], "Order Invoice", "", invoiceHTML)
        }
        return invoiceHTML;

    }
    public async getOrdersCountByProductId(productId: string): Promise<number> {
        return await this.orderDBManager.getOrdersCountByProductId(productId);
    }
    public async getOrdersCountByVariantId(variantId: string): Promise<number> {
        return await this.orderDBManager.getOrdersCountByVariantId(variantId);
    }
    public async isAlreadyReached(orderId: string, alreadyReached: boolean): Promise<CustomerOrderModel> {
        return await this.orderDBManager.isAlreadyReached(orderId, alreadyReached);
    }
}