import * as mongoose from "mongoose";
import {Schema} from "mongoose";

const userDataSchema = new Schema({
	userID: {type: Number, required: true, unique: true},
	registeredOn: {type: Date, required: true},
	battletag: {type: String, required: true},
	skillTier: String,
	skillRating: Number,
	skillRatingHistory: [{date: Date, skillRating: Number}]
},{collection: "user-data"});

export const UserData = mongoose.model("UserData", userDataSchema);