"use client";
import { BoostItems } from "@/app/models/BoostItems";
import { useUser } from "@/hooks/userHook";
import { ArrowDownLeftIcon } from "@heroicons/react/20/solid";
import BoostItem from "./BoostItem";
const BoostMenu: React.FC = () => {
  const user = useUser();

  const availableBoostItems = BoostItems.filter(
    (boostItem) =>
      user.boostItems &&
      !user.boostItems.some(
        (userBoostItem) => userBoostItem.id === boostItem.id
      )
  );

  return (
    <div className="p-4">
      <h1 className="pt-8">Boost Menu</h1>
      <h2 className="pt-4 pb-4">Available Boost Items</h2>
      <div className="flex flex-col justify-center space-y-4">
        {availableBoostItems.map((boostItem) => (
          <BoostItem
            key={boostItem.id}
            {...boostItem}
          />
        ))}
      </div>
      <h2 className="pt-8 pb-4">Your Boost Items</h2>
      <div className="flex flex-col justify-center space-y-4">
        {user.boostItems?.map((boostItem) => (
          <BoostItem key={boostItem.id} {...boostItem} isActive={true} />
        ))}
      </div>
    </div>
  );
};

export default BoostMenu;
