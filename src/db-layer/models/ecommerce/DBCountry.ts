

import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const DBCountryTimeZonesSchema = new Schema({

    zoneName: {
        type: String
    },
    gmtOffset: {
        type: Number
    },
    gmtOffsetName: {
        type: String
    },
    abbreviation: {
        type: String
    },
    tzName: {
        type: String
    }
}, { _id: false });

export const DBCountrySchema = new Schema({
    countryName: {
        type: String
    },
    name: {
        type: String
    },
    iso3: {
        type: String
    },
    iso2: {
        type: String
    },
    phone_code: {
        type: Date
    },
    capital: {
        type: String
    },
    currency: {
        type: String
    },
    currency_symbol: {
        type: String
    },
    native: {
        type: String
    },
    region: {
        type: String
    },
    subregion: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    emoji: {
        type: String
    },
    emojiU: {
        type: String
    }, timezones: {
        type: [DBCountryTimeZonesSchema]
    }

}, { timestamps: true })

DBCountrySchema.index({ countryName: 1 });