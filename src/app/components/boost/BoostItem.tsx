"use client";

import { IBoostItem } from "@/app/models/BoostItems";
import { requestBoostItemCall } from "@/app/services/apiClient";
import { useUser, useUserUpdate } from "@/hooks/userHook";
interface BoostItemProps extends IBoostItem {
  isActive?: boolean;
}
const BoostItem: React.FC<BoostItemProps> = ({
  id,
  title,
  cost,
  description,
  expires,
  isActive,
}) => {
  const { setUser } = useUserUpdate();
  const user = useUser();
  // an boost item that can be clicked and and show some information about it
  const clickHandler = async () => {
    const response = await requestBoostItemCall(user.telegramId, id);
    if (response.success) {
      setUser((prev) => ({
        ...prev,
        boostItems: response.boostItems,
        totalCoins: user.totalCoins - cost,
      }));
    }
  };
  return (
    <button
      onClick={clickHandler}
      className="w-full text-left  bg-gray-800 rounded-xl "
    >
      <h2 className="text-white text-sm font-bold m-2 pl-4">{title}</h2>
      <p className=" m-2 text-sm mb-4 pl-4">{description}</p>
      <p className=" m-2 text-sm mb-4 pl-4">cost: {cost}</p>
      {isActive && (
        <p className="text-gray-300 text-xs m-2 pl-4">
          expires: {expires ? expires.toString() : "never"}
        </p>
      )}
    </button>
  );
};

export default BoostItem;
