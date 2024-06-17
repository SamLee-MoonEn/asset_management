import { assetsDataType } from "../../interface/Interface";
import NullImage from "../../assets/kohyoung_icon.png";
import { UseMutateFunction } from "react-query";
import { RefObject } from "react";

export default function SearchModal({
  modalData,
  rentalReturn,
  closeModalRef,
}: {
  modalData: assetsDataType | undefined;
  rentalReturn: UseMutateFunction<void, unknown, assetsDataType, unknown>;
  closeModalRef: RefObject<HTMLInputElement>;
}) {
  const handleRentalReturn = () => {
    if (modalData) rentalReturn(modalData);
    if (closeModalRef.current) closeModalRef.current.checked = false;
  };

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
            <div className="grid grid-cols-2 shadow-lg mb-4 ">
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
                <div className="stat place-items-center w-full overflow-auto out-of-range:text-xs">
                  <div className="stat-title">Specification</div>
                  <div className="stat-desc text-xl text-black ">
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
                  <div className="stat-desc text-xl text-black">
                    {modalData?.stock}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider text-gray-400"></div>
        <div className="w-1/2 flex justify-between mt-4 ml-auto">
          <div
            className={`btn text-white bg-light hover:bg-main w-5/12 ${
              modalData?.status ? "" : "btn-disabled"
            }`}
            onClick={handleRentalReturn}
          >
            대여
          </div>
          <div
            className={`btn text-white w-5/12 btn-error ${
              modalData?.status ? "btn-disabled" : ""
            }`}
            onClick={handleRentalReturn}
          >
            반납
          </div>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="my_modal_7"></label>
    </div>
  );
}
