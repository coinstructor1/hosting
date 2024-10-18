import mongoose from "mongoose";

import { boostItemSchema, IBoostItem } from "./BoostItems";
import { miningItemSchema } from "./MiningItems";

export interface IUser {
  name: string;
  image: string;
  telegramId: string;
  earnPerTap: number;
  coinsToLevelUp: number;
  profitPerHour: number;
  totalCoins: number;
  level: number;
  boostScore: number;
  isMining: boolean;
  earnItems: string[];
  lastMiningTime?: Date;
  combosCompleted?: string[];
  miningItems?: [{ id: string; level: number }] | undefined;
  boostItems?: IBoostItem[] | undefined;
}

export interface IMongoUser extends IUser, mongoose.Document {}

export const userSchema = new mongoose.Schema<IMongoUser>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  telegramId: {
    // now its a fake id
    type: String,
    required: true,
  },
  earnPerTap: {
    type: Number,
    default: 1,
    required: false,
  },
  coinsToLevelUp: {
    type: Number,
    required: false,
  },
  profitPerHour: {
    type: Number,
    required: false,
  },
  totalCoins: {
    type: Number,
    required: false,
  },
  level: {
    type: Number,
    required: false,
  },
  boostScore: {
    type: Number,
    required: false,
  },
  isMining: {
    type: Boolean,
    required: false,
  },
  lastMiningTime: {
    type: Date,
    default: undefined,
    required: false,
  },
  combosCompleted: {
    type: [String],
    default: [],
    required: false,
  },
  miningItems: {
    type: [miningItemSchema],
    default: [],
    required: false,
  },
  earnItems: {
    type: [String],
    default: [],
    required: false,
  },
  boostItems: {
    type: [boostItemSchema],
    default: [],
    required: false,
  },
});
export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
