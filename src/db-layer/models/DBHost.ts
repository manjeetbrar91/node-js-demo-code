import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";
const Schema = mongoose.Schema;
export const DBHostSchema = new Schema({
    hostName: {
        type: String
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantsCollection
    },
    chainId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantChainsCollection
    },
})