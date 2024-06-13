import { assetsDataType } from "../../interface/Interface";
import NullImage from "../../assets/kohyoung_icon.png";

export default function SearchTableRow({
  item,
  showModal,
}: {
  item: assetsDataType;
  showModal: (modalData: assetsDataType) => void;
}) {
  return (
    <tr
      className="hover:bg-slate-500 hover:text-white transition-all text-center text-xs"
      onClick={() => showModal(item)}
    >
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              src={item.itemImage != "" ? item.itemImage : NullImage}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
      </td>
      <td>{item.itemCode}</td>
      <td>{item.itemName}</td>
      <td>{item.specification}</td>
      <td>{item.serial}</td>
      <td>{item.storage}</td>
      <td>{item.status ? "보유" : "대여"}</td>
      <td>{item.renter}</td>
      <td>{item.rentDate}</td>
      <td>{item.stock}</td>
    </tr>
  );
}
