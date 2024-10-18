"use client";
import { IEarnItem } from "@/app/models/EarnItems";
import { requestEarnItemCall } from "@/app/services/apiClient";
import { useUser, useUserUpdate } from "@/hooks/userHook";
import { ModalType, openModal } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/store";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
interface EarnItemProps {
  item: IEarnItem;
}

const EarnItem: React.FC<EarnItemProps> = ({ item }) => {
  const user = useUser();
  const { setUser } = useUserUpdate();
  const dispatch = useAppDispatch();

  const handleOpenModal = (success: boolean, message: string) => {
    const modalType: ModalType = success ? "CONFIRMATION" : "NOTIFICATION";
    dispatch(
      openModal({
        modalType: modalType,
        title: modalType.toString(),
        message: message,
      })
    );
  };

  const clickHandler = async () => {
    const { totalCoins, success, message } = await requestEarnItemCall(
      user.telegramId,
      item.id
    );

    handleOpenModal(success, message);

    if (success) {
      setUser({ ...user, totalCoins, earnItems: [...user.earnItems, item.id] });
      if (item.link) window.location.href = item.link;
    }
  };

  return (
    <button
      onClick={clickHandler}
      className="w-full bg-gray-800 rounded-2xl flex items-center justify-between mb-2"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 ml-4">
          <Image src={item.image} alt={item.name} width={30} height={30} />
        </div>
        <div className="ml-4">
          <h2 className="text-sm font-light">{item.name}</h2>
          <div className="flex items-center">
            <Image
              src="/icons/coin.png"
              alt="Coin Icon"
              width={20}
              height={20}
            />
            <span className="ml-1">{item.value}</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        {!user.earnItems?.includes(item.id) ? (
          <ChevronRightIcon className="w-6 h-6 text-gray-300 mr-4" />
        ) : (
          <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
        )}
      </div>
    </button>
  );
};
export default EarnItem;
