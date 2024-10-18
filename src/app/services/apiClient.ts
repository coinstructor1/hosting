import axios from "axios";


import { IBoostItem } from "../models/BoostItems";
import UserModel from "../models/UserModel";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export const fetchUserData = async (telegramId: string): Promise<UserModel> => {
  const response = await axios.post<UserModel>("/api/user", telegramId, {
    headers: jsonHeaders,
  });
  return response.data;
};
export const incrementCoinsCall = async (
  clicks: number,
  telegramId: string
) => {
  const response = await axios.put("/api/incrementCoins", {
    clicks: clicks,
    telegramId: telegramId,
  });
  return response.data;
};

export const updateMiningCoinsCall = async (telegramId: string) => {
  const response = await axios.post("/api/mining", { telegramId });
  return response.data;
};

export const activateMiningCall = async (telegramId: string) => {
  const response = await axios.post("/api/mining/activate", { telegramId });
  return response.data;
};
export const activateMiningItemCall = async (
  telegramId: string,
  miningItemId: string
) => {
  const response = await axios.post("/api/mining/activate/" + miningItemId, {
    telegramId,
    miningItemId,
  });
  return response.data;
};
export const requestEarnItemCall = async (
  telegramId: string,
  earnItemId: string
): Promise<{ success: boolean; message: string; totalCoins: number }> => {
  const response = await axios.post("/api/incrementCoins/earn", {
    telegramId,
    earnItemId,
  });
  return response.data;
};
export const requestBoostItemCall = async (
  telegramId: string,
  boostItemId: string
): Promise<{
  success: boolean;
  message: string;
  expires?: Date;
  boostItems?: IBoostItem[];
}> => {
  const response = await axios.post("/api/boost", {
    telegramId,
    boostItemId,
  });
  return response.data;
};
