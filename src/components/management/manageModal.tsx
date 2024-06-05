import { useEffect, useState } from "react";

import { assetsDataType } from "../../interface/Interface";
import NullImage from "../../assets/kohyoung_icon.png";

export default function manageModal({
  modalData,
  closeModal,
}: {
  modalData: assetsDataType | undefined;
  closeModal: () => void;
}) {
  const [stockValue, setStockValue] = useState(modalData?.stock);

  const increaseStockValue = () => {
    let tempValue = 0;
    if (stockValue != undefined) tempValue = stockValue + 1;
    setStockValue(tempValue);
  };
  const decreaseStockValue = () => {
    let tempValue = 0;
    if (stockValue) tempValue = stockValue - 1;
    setStockValue(tempValue);
  };

  const cancelChange = () => {
    closeModal();
    setStockValue(modalData?.stock);
  };
  useEffect(() => {
    setStockValue(modalData?.stock);
  }, [modalData]);

  return (
    <div className="modal" role="dialog">
      <div className="modal-box w-7/12 max-w-4xl">
        <h3 className="text-2xl font-bold mb-4">{modalData?.itemName}</h3>
        <div className="flex">
          <div className="avatar">
            <div className="w-96 rounded">
              <img
                src={
                  modalData?.itemImage != "" ? modalData?.itemImage : NullImage
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center ml-4 w-full">
            <div className="divider text-gray-400">Item Code</div>
            <p className="py-2">{modalData?.itemCode}</p>
            <div className="divider text-gray-400">Item Name</div>
            <p className="py-2">{modalData?.itemName}</p>
            <div className="divider text-gray-400">Specification</div>
            <p className="py-2">{modalData?.specification}</p>
            <div className="divider text-gray-400">Serial</div>
            <p className="py-2">{modalData?.serial}</p>
            <div className="divider text-gray-400">Status</div>
            <p className="py-2">{modalData?.status ? "보유" : "대여"}</p>
            <div className="divider text-gray-400">재고</div>
            <div className="flex items-center">
              <button className="btn" onClick={decreaseStockValue}>
                {" "}
                {"<"}{" "}
              </button>
              <p className="py-2 mx-10">{stockValue}</p>
              <button className="btn" onClick={increaseStockValue}>
                {" "}
                {">"}{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="divider text-gray-400"></div>
        <div className="w-1/2 flex justify-between mt-4 ml-auto">
          <button className="btn bg-light text-white hover:bg-main w-5/12">
            수정
          </button>
          <button
            className="btn btn-error text-white hover:bg-red-600 w-5/12"
            onClick={cancelChange}
          >
            취소
          </button>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="my_modal_7"></label>
    </div>
  );
}
