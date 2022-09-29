import * as mongoose from "mongoose";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { IOrderDBManager } from "../../../db-layer/interfaces/ecommerce/IOrderDBManager";
import { DBCustomerOrderSchema } from "../../../db-layer/models/ecommerce/DBCustomerOrders";
import { AppointmentStatusEnum } from "../../../service-layer/models/ecommerce/AppointmentStatusEnum";
import { CustomerOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";
import { OrderPaymentType, OrderStatusEnum } from "../../../service-layer/models/ecommerce/OrderStatusEnum";
import { OrderTypeEnum } from "../../../service-layer/models/ecommerce/OrderTypeEnum";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { telemetry } from "../../../telemetry";
import { GetUserOrderRequestModel } from "../../../web-layer/models/ecommerce/request/GetUserOrderRequestModel";
import { RescheduleAppointmentModel } from "../../../web-layer/models/ecommerce/request/RescheduleAppointmentModel";
import { DBConstants } from "../../models/DBConstants";
export class MongoOrderDBManager implements IOrderDBManager {
    private orderDB: any;

    constructor() {
        this.orderDB = mongoose.model(DBConstants.UserOrdersCollection, DBCustomerOrderSchema);
    }

    public async createOrder(data: CustomerOrderModel): Promise<CustomerOrderModel> {
        try {
            let startTime = new Date();
            if (data.getOrderType() == OrderTypeEnum.Appointment) {
                data.setApptStatus(AppointmentStatusEnum.Created);
                data.setChannelOrderStatus(OrderStatusEnum.Placed);
            }
            if (data.getPaymentType() == OrderPaymentType.COD) {
                data.setChannelOrderStatus(OrderStatusEnum.Placed);
            }
            let db = new this.orderDB(data);
            let ret = await db.save();
            telemetry.timing("backend.mongo.createOrder", startTime);
            return EcommerceUtility.getUserOrderDataModel(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async removeUnwantedDataFromUpdateOrder(data: CustomerOrderModel): Promise<CustomerOrderModel> {
        data.setCreatedAt(undefined);
        data.setLastModifiedAt(undefined);
        data.setChannelOrderStatus(undefined);
        data.setPayments(undefined);
        data.setPaymentStatus(undefined);
        data.setCurrency(undefined);
        data.setCurrencySymbol(undefined);
        data.setCurrencyConversion(undefined);
        data.setBillNumber(undefined);
        data.setId(undefined);
        return data;
    }
    public async updateOrder(data: CustomerOrderModel): Promise<CustomerOrderModel> {
        try {
            let orderId = data.getId();
            let startTime = new Date();
            data = await this.removeUnwantedDataFromUpdateOrder(data);
            let json = JSON.stringify(data);
            let db = new this.orderDB()
            let ret = await this.orderDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(orderId) }, {
                $set: JSON.parse(json)
            }, { new: true });

            telemetry.timing("backend.mongo.updateOrder", startTime);
            if (ret) {
                return EcommerceUtility.getUserOrderDataModel(ret);
            } else {
                throw new Error("Order Not Found")
            }

        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getUserOrders(data: GetUserOrderRequestModel): Promise<ResultModel> {
        data = EcommerceUtility.validateRequest(data);
        let where = {
            userId: new mongoose.Types.ObjectId(data.userId),
            channelOrderStatus: { $ne: OrderStatusEnum.Created }
        };
        let baseQuery: any = [
            {
                $match: where
            },
            {
                '$lookup': {
                    'from': 'businesses',
                    'localField': 'businessId',
                    'foreignField': '_id',
                    'as': 'business'
                }
            }, {
                '$addFields': {
                    'businessName': {
                        '$arrayElemAt': ['$business.businessName', 0]
                    },
                    'businessContactNumber': {
                        '$arrayElemAt': ['$business.phoneNumber', 0]
                    },
                    'businessCountryCode': {
                        '$arrayElemAt': ['$business.countryCode', 0]
                    },
                    'businessLatitude': {
                        '$arrayElemAt': ['$business.latitude', 0]
                    },
                    'businessLongitude': {
                        '$arrayElemAt': ['$business.longitude', 0]
                    }
                }
            }, {
                '$project': {
                    'business': 0,
                    'products': 0,
                    'extraCharges': 0,
                    'deliveryAddress': 0,
                    'inCarDeliveryInfo': 0,
                    'payments': 0,
                    'statusHistory': 0
                }
            }
        ]
        let totalDocs: number = await this.getTotalDocs(baseQuery, this.orderDB);
        baseQuery.push({ $sort: { updatedAt: -1 } },
            { $skip: data.offset },
            { $limit: data.limit });


        console.log(JSON.stringify(baseQuery));

        let items = await this.orderDB.aggregate(baseQuery);
        let orders = [];
        if (items && items[0]) {
            orders = EcommerceUtility.getListOfItems(items, EcommerceUtility.getUserOrderDataModel);
        }
        let resultModel = new ResultModel();
        resultModel.setData(orders);
        resultModel.setTotal(totalDocs);
        resultModel.setLimit(data.limit);
        resultModel.setOffset(data.offset);
        return resultModel;
    }


    public async getOrderQueryByStatus(status: string): Promise<any> {
        if (status.toLowerCase() == "new orders") {
            return { $in: [OrderStatusEnum.Placed] }
        } else if (status.toLowerCase() == "accepted") {
            return { $in: [OrderStatusEnum.Approved, OrderStatusEnum.PaymentRequested, OrderStatusEnum.InProgress] }

        } else if (status.toLowerCase() == "rejected") {
            return { $in: [OrderStatusEnum.Rejected, OrderStatusEnum.Cancelled] }

        } else if (status.toLowerCase() == "packed") {
            return { $in: [OrderStatusEnum.Packed, OrderStatusEnum.ReadyForPickUp, OrderStatusEnum.ReadytoShip, OrderStatusEnum] }

        } else if (status.toLowerCase() == "dispatched") {
            return { $in: [OrderStatusEnum.OutForDelivery, OrderStatusEnum.Dispatched] }

        } else if (status.toLowerCase() == "completed") {
            return { $in: [OrderStatusEnum.Picked, OrderStatusEnum.Completed, OrderStatusEnum.Delivered] }

        } else {
            return { $ne: OrderStatusEnum.Created }
        }
    }
    public async getBusinessOrders(data: GetUserOrderRequestModel): Promise<ResultModel> {
        data = EcommerceUtility.validateRequest(data);
        let where: any = {
            businessId: new mongoose.Types.ObjectId(data.businessId),
            channelOrderStatus: { $ne: OrderStatusEnum.Created }
        };
        if (data.status != undefined && data.status != "all" && data.status != "All" && data.status != "") {
            // where.channelOrderStatus = await this.getOrderQueryByStatus(data.status)
            where = {
                businessId: new mongoose.Types.ObjectId(data.businessId),
                channelOrderStatus: await this.getOrderQueryByStatus(data.status)
            };
        }
        let baseQuery: any = [
            { $match: where },
            {
                '$lookup': {
                    'from': 'vehicleowner',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            {
                '$addFields': { 'user': { '$arrayElemAt': ['$user', 0] } }
            },
            {
                '$project': {
                    'business': 0,
                    'products': 0,
                    'extraCharges': 0,
                    'deliveryAddress': 0,
                    'inCarDeliveryInfo': 0,
                    'payments': 0,
                    'statusHistory': 0
                }
            }
        ]
        let totalDocs: number = await this.getTotalDocs(baseQuery, this.orderDB);
        baseQuery.push({ $sort: { updatedAt: -1 } },
            { $skip: data.offset },
            { $limit: data.limit });


        console.log(JSON.stringify(baseQuery));

        let items = await this.orderDB.aggregate(baseQuery);
        let orders = [];
        if (items && items[0]) {
            orders = EcommerceUtility.getListOfItems(items, EcommerceUtility.getUserOrderDataModel);
        }
        let resultModel = new ResultModel();
        resultModel.setData(orders);
        resultModel.setTotal(totalDocs);
        resultModel.setLimit(data.limit);
        resultModel.setOffset(data.offset);
        return resultModel;
    }

    public async getBusinessOrderDetailsByOrderId(orderId: string): Promise<CustomerOrderModel> {
        let where = {
            _id: new mongoose.Types.ObjectId(orderId),
        };
        let baseQuery: any = [
            { $match: where },
            {
                '$lookup': {
                    'from': 'vehicleowner',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            {
                '$addFields': { 'user': { '$arrayElemAt': ['$user', 0] } }
            },
            {
                '$unwind': {
                    'path': '$products',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$addFields': {
                    'products.productId': {
                        '$convert': {
                            'input': '$products.productId',
                            'to': 'objectId'
                        }
                    }
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'products.productId',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }, {
                '$addFields': {
                    'products.defaultImage': {
                        '$arrayElemAt': [
                            '$product.defaultImage', 0
                        ]
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id',
                    'root': {
                        '$mergeObjects': '$$ROOT'
                    },
                    'products': {
                        '$push': '$products'
                    }
                }
            }, {
                '$replaceRoot': {
                    'newRoot': {
                        '$mergeObjects': [
                            '$root', '$$ROOT'
                        ]
                    }
                }
            }, {
                '$project': {
                    'root': 0,
                    'product': 0
                }
            }

        ]
        console.log(JSON.stringify(baseQuery));

        let items = await this.orderDB.aggregate(baseQuery);
        let orders = [];
        if (items && items[0]) {
            return EcommerceUtility.getUserOrderDataModel(items[0]);
        } else {
            throw new MyError("Order not found");
        }
    }

    public async getTotalDocs(query: any, data: any): Promise<number> {
        query.push({ $group: { _id: null, total: { $sum: 1 } } });
        let numberOfOrders = await data.aggregate(query);
        query.splice(query.length - 1, 1);
        return numberOfOrders[0] && numberOfOrders[0].total;
    }


    public async updateChannelOrderStatus(orderId: string, status: OrderStatusEnum): Promise<CustomerOrderModel> {

        let data: any = {
            channelOrderStatus: status,
        }
        if (status == OrderStatusEnum.Delivered) {
            data = {
                channelOrderStatus: status,
                deliveryDate: new Date()
            }
        }

        await this.setAppointmentStatus(status, orderId, data);

        let ret = await this.orderDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(orderId) }, {
            $set: data
        }, { new: true });
        if (ret) {
            return EcommerceUtility.getUserOrderDataModel(ret);
        }
        return null;
    }
    public async setAppointmentStatus(status: string, orderId: string, data: any): Promise<any> {

        if (status == OrderStatusEnum.Approved || status == OrderStatusEnum.Rejected || status == OrderStatusEnum.Cancelled) {
            let order = await this.getOrderDetailsByOrderId(orderId);
            if (order.getOrderType() == OrderTypeEnum.Appointment) {
                switch (status) {
                    case OrderStatusEnum.Approved: {
                        data['apptStatus'] = AppointmentStatusEnum.Booked;
                        break
                    }
                    case OrderStatusEnum.Cancelled: {
                        data['apptStatus'] = AppointmentStatusEnum.Cancelled;
                        break
                    }
                    case OrderStatusEnum.Rejected: {
                        data['apptStatus'] = AppointmentStatusEnum.Rejected;
                        break
                    }
                }
            }
        }
        return data;
    }
    public async rescheduleAppointmentBusiness(req: RescheduleAppointmentModel): Promise<CustomerOrderModel> {

        let data = {
            // channelOrderStatus: OrderStatusEnum.Rescheduled,
            apptRemarksByBusiness: req.apptRemarksByBusiness,
            apptSuggestedDate: req.apptSuggestedDate,
            apptSuggestedTime: req.apptSuggestedTime,
            apptStatus: AppointmentStatusEnum.Rescheduled
        }

        let ret = await this.orderDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.orderId) }, {
            $set: data
        }, { new: true });
        if (ret) {
            return EcommerceUtility.getUserOrderDataModel(ret);
        }
        return null;
    }
    public async updateAppointment(order: CustomerOrderModel): Promise<CustomerOrderModel> {

        let data = {
            apptDate: order.getApptDate(),
            apptTime: order.getApptTime(),
            apptRemarksByUser: order.getApptRemarksByUser(),
            apptStatus: order.getApptStatus(),
            channelOrderStatus: order.getChannelOrderStatus()
        }

        let ret = await this.orderDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(order.getId()) }, {
            $set: data
        }, { new: true });
        if (ret) {
            return EcommerceUtility.getUserOrderDataModel(ret);
        }
        return null;
    }



    public async updateOrderPaymentStatus(orderId: string, order: CustomerOrderModel): Promise<CustomerOrderModel> {
        let data;
        if (order.getChannelOrderStatus() != undefined && order.getChannelOrderStatus().toString() != "") {
            data = {
                payments: order.getPayments(),
                paymentStatus: order.getPaymentStatus(),
                channelOrderStatus: order.getChannelOrderStatus(),
                transactionType: order.getTransactionType(),
                appStatus: order.getApptStatus()
            }
        } else {
            data = {
                payments: order.getPayments(),
                paymentStatus: order.getPaymentStatus(),
                transactionType: order.getTransactionType(),

            }
        }
        let ret = await this.orderDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(orderId) }, {
            $set: data
        }, { new: true });

        return order;
    }
    public async getOrderDetailsByOrderId(orderId: string): Promise<CustomerOrderModel> {

        let where = {
            _id: new mongoose.Types.ObjectId(orderId)
        };
        let baseQuery: any = [
            {
                $match: where
            },
            {
                '$lookup': {
                    'from': 'businesses',
                    'localField': 'businessId',
                    'foreignField': '_id',
                    'as': 'business'
                }
            }, {
                '$addFields': {
                    'businessName': {
                        '$arrayElemAt': ['$business.businessName', 0]
                    },
                    'businessContactNumber': {
                        '$arrayElemAt': ['$business.phoneNumber', 0]
                    },
                    'businessCountryCode': {
                        '$arrayElemAt': ['$business.countryCode', 0]
                    },
                    'businessLatitude': {
                        '$arrayElemAt': ['$business.latitude', 0]
                    },
                    'businessLongitude': {
                        '$arrayElemAt': ['$business.longitude', 0]
                    }
                }
            }
        ]




        let items = await this.orderDB.aggregate(baseQuery);
        let orders = [];
        if (items && items[0]) {
            return EcommerceUtility.getUserOrderDataModel(items[0]);
        } else {
            throw new MyError("Order not found");
        }

    }


    public async getOrdersCountByProductId(productId: string): Promise<number> {
        let count = await this.orderDB.count({ "products.productId": productId });
        return count;
    }
    public async getOrdersCountByVariantId(variantId: string): Promise<number> {
        let count = await this.orderDB.count({ "products.variantId": variantId });
        return count;
    }

    public async isAlreadyReached(orderId: string, alreadyReached: boolean): Promise<CustomerOrderModel> {
        if (alreadyReached == undefined) {
            alreadyReached = false;
        }
        let data = {
            alreadyReached: alreadyReached
        }

        let ret = await this.orderDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(orderId) }, {
            $set: data
        }, { new: true });
        if (ret) {
            return EcommerceUtility.getUserOrderDataModel(ret);
        }
        return null;
    }
}