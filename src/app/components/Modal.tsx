import { closeModal } from "@/store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modalType, title, message } = useAppSelector(
    (state) => state.modal
  );

  if (!isOpen || !modalType) return null;

  let content;
  let backgroundColor;

  switch (modalType) {
    case "NOTIFICATION":
      content = <p>{message}</p>;
      backgroundColor = "bg-red-500";
      break;
    case "CONFIRMATION":
      content = (
        <>
          <p>{message}</p>
        </>
      );
      backgroundColor = "bg-green-500";
      break;
    default:
      content = null;
      backgroundColor = "bg-black";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => dispatch(closeModal())}
      ></div>
      <div
        className={`rounded-lg shadow-lg p-6 z-10 ${backgroundColor}`}
        onClick={() => dispatch(closeModal())}
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
