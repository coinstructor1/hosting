import { UserContext, UserUpdateContext } from "@/app/context/UserContext";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useUserUpdate = () => {
  const context = useContext(UserUpdateContext);
  if (context === undefined) {
    throw new Error("useUserUpdate must be used within a UserProvider");
  }
  return context;
};
