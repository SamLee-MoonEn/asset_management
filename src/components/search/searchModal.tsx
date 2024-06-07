import { assetsDataType } from "../../interface/Interface";
import NullImage from "../../assets/kohyoung_icon.png";

export default function SearchModal({
  modalData,
}: {
  modalData: assetsDataType | undefined;
}) {
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
            <p className="py-2">{modalData?.stock}</p>
            <div className="flex w-full justify-between">
              <div
                className={`btn text-white bg-light hover:bg-main w-5/12 ${
                  modalData?.status ? "" : "btn-disabled"
                }`}
              >
                대여
              </div>
              <div
                className={`btn text-white w-5/12 btn-error ${
                  modalData?.status ? "btn-disabled" : ""
                }`}
              >
                반납
              </div>
            </div>
          </div>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="my_modal_7"></label>
    </div>
  );
}
