import UserModel from "@/app/models/UserModel";
import { fetchUserData } from "@/app/services/apiClient";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { newUserEnviroment } from "../constants";

interface UserUpdateContextType {
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserModel | undefined>(undefined);
export const UserUpdateContext = createContext<
  UserUpdateContextType | undefined
>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  //load user data from backend on mount
  //telegramId is hardcoded for now
  const telegramId = { telegramId: newUserEnviroment.telegramId };

  const [user, setUser] = useState<UserModel>(newUserEnviroment);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchUserData(JSON.stringify(telegramId));
        setUser(response);
      } catch (e) {
        console.error("Failed to fetch user data: " + e);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);


  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider
        value={{ setUser, loading, setLoading }}
      >
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
