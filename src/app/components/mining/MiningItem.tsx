"use client";
import { defaultTelegramId } from "@/app/constants";
import { IMiningItem } from "@/app/models/MiningItems";
import { activateMiningItemCall } from "@/app/services/apiClient";
import { useUser, useUserUpdate } from "@/hooks/userHook";
import { ModalType, openModal } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";

export default function MiningItem({
  id,
  image,
  title,
  profitPerHour,
  level,
  cost,
}: IMiningItem) {
  const { setUser } = useUserUpdate();
  const user = useUser();
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
    const userState = await activateMiningItemCall(defaultTelegramId, id);
    setUser(userState.user);
    handleOpenModal(userState.success, userState.message);
  };
  return (
    <button
      onClick={clickHandler}
      className="border border-gray-300 rounded-lg overflow-hidden m-2"
    >
      <div className="flex p-2 items-center">
        <Image
          src={image}
          alt={title}
          width={20}
          height={20}
          className="mr-2"
        />
        <div className="flex flex-col">
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-xs text-gray-600">
            Profit per Hour: {profitPerHour}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 mx-2"></div>
      <div className="flex justify-between p-2">
        <div className="text-xs">
          Level:{" "}
          {user.miningItems?.find((item) => item.id === id)?.level != undefined
            ? user.miningItems?.find((item) => item.id === id)?.level
            : 0}
        </div>
        <div className="border-l border-gray-300 mx-2"></div>
        <div className="text-xs">Cost: {cost}</div>
      </div>
    </button>
  );
}
