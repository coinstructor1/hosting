import {
  backendSyncInterval,
  clickspendingTime,
  miningDistributionInterval,
} from "@/app/constants";
import { useGameContext } from "@/app/context/GameContext";
import {
  activateMiningCall,
  incrementCoinsCall,
  updateMiningCoinsCall,
} from "@/app/services/apiClient";
import { calculateCoins, checkBoostItems } from "@/app/services/boostService";
import { useEffect, useRef, useState } from "react";
import { useUser, useUserUpdate } from "./userHook";

export function useCoinIncrement() {
  const [clickCount, setClickCount] = useState(0);
  const { setClicksPending } = useGameContext();
  const user = useUser();
  const userUpdate = useUserUpdate();

  const incrementCoins = () => {
    setClickCount((prev) => prev + 1);

    const boostItems = checkBoostItems(user.boostItems, true);

    userUpdate.setUser((prevUser) => ({
      ...prevUser,
      totalCoins:
        prevUser.totalCoins + calculateCoins(prevUser.earnPerTap, boostItems),
    }));

    setClicksPending(true);
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timeout = setTimeout(async () => {
        try {
          const response = await incrementCoinsCall(
            clickCount,
            user.telegramId
          );
          userUpdate.setUser(response.user);
          setClickCount(0);
          setClicksPending(false);
        } catch (e) {
          console.error("Fehler beim Erhöhen der Coins:", e);
        }
      }, clickspendingTime);

      return () => clearTimeout(timeout);
    }
  }, [clickCount, user.telegramId, setClicksPending]);

  return { incrementCoins };
}

export function useMining() {
  const user = useUser();
  const userUpdate = useUserUpdate();
  const [isUpdating, setIsUpdating] = useState(false);
  const { clicksPending } = useGameContext();

  // Verwende useRef, um den aktuellen Wert von clicksPending zu speichern
  const clicksPendingRef = useRef(clicksPending);

  // Aktualisiere clicksPendingRef, wenn clicksPending sich ändert
  useEffect(() => {
    clicksPendingRef.current = clicksPending;
  }, [clicksPending]);

  const updateMiningCoins = async () => {
    console.log("Aktueller clicksPending-Wert:", clicksPendingRef.current);
    if (!clicksPendingRef.current) {
      setIsUpdating(true);

      try {
        const response = await updateMiningCoinsCall(user.telegramId);

        if (response.success) {
          userUpdate.setUser(response.user);
        } else {
          console.error("error: ", response.message);
        }
      } catch (error) {
        console.error("Error by claiming ", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (user.isMining) {
      updateMiningCoins();
      interval = setInterval(updateMiningCoins, backendSyncInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user.telegramId, user.isMining]);

  const activateMining = async () => {
    try {
      const response = await activateMiningCall(user.telegramId);
      if (response.success) {
        userUpdate.setUser(response.user);
      } else {
        console.error("error: ", response.message);
      }
    } catch (error) {
      console.error("Error by activating mining ", error);
    }
  };
  return { isUpdating, updateMiningCoins, activateMining };
}
