import { assetsDataType } from "../../interface/Interface";
import NullImage from "../../assets/kohyoung_icon.png";

export default function ManageTableRow({
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
      <td className="p-1">{item.itemCode}</td>
      <td className="p-1">{item.itemName}</td>
      <td className="p-1 w-72">{item.specification}</td>
      <td className="p-1">{item.serial}</td>
      <td className="p-1">{item.storage}</td>
      <td className="p-1">{item.status ? "보유" : "대여"}</td>
      <td className="p-1">{item.renter}</td>
      <td className="p-1">{item.rentDate}</td>
      <td className="p-1">{item.stock}</td>
    </tr>
  );
}
