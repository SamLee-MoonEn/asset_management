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
      <div className="modal-box w-7/12 max-w-5xl">
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
            <div className="stats shadow w-full">
              <div className="stats stats-vertical shadow">
                <div className="stat place-items-center">
                  <div className="stat-title">Item Code</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.itemCode}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Item Name</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.itemName}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Specification</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.specification}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Serial</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.serial}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">보관 위치</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.storage}
                  </div>
                </div>
              </div>
              <div className="stats stats-vertical shadow">
                <div className="stat place-items-center">
                  <div className="stat-title">Status</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.status ? "보유" : "대여"}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">대여자</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.renter}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">대여 날짜</div>
                  <div className="stat-desc text-xl text-black">
                    {modalData?.rentDate}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Stock</div>
                  <div className="stat-actions text-xl text-black flex">
                    {" "}
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
