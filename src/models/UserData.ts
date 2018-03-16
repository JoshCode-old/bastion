import {Document, Model, Schema, model} from "mongoose";

interface IUserData {
	userID: number,
	registeredOn: string,
	battletag: string,
	skillTier?: string,
	skillRating?: number,
	skillRatingHistory?: [{date: string, skillRating: number}]
}

interface IUserDataModel extends IUserData, Document {
}

const UserDataSchema = new Schema({
	userID: {type: Number, required: true, unique: true},
	registeredOn: {type: Date, required: true},
	battletag: {type: String, required: true},
	skillTier: String,
	skillRating: Number,
	skillRatingHistory: [{date: Date, skillRating: Number}]
}, {collection: "user-data"});

const UserData: Model<IUserDataModel> = model("UserData", UserDataSchema);

export {IUserData, IUserDataModel, UserDataSchema, UserData};