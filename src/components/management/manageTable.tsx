import { assetsDataType } from "../../interface/Interface";
import ManageTableRow from "./manageTableRow";

export default function ManageTable({
  testData,
  showModal,
}: {
  testData: assetsDataType[];
  showModal: (modalData: assetsDataType) => void;
}) {
  return (
    <>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Item Image</th>
            <th className="p-1">Item Code</th>
            <th className="p-1">Item Name</th>
            <th className="p-1">Specification</th>
            <th className="p-1">Serial</th>
            <th className="p-1">보관 위치</th>
            <th className="p-1">Status</th>
            <th className="p-1">대여자</th>
            <th className="p-1">대여 날짜</th>
            <th className="p-1">Stock</th>
          </tr>
        </thead>
        <tbody>
          {testData.map((v, i) => (
            <ManageTableRow item={v} key={i} showModal={showModal} />
          ))}
        </tbody>
      </table>
    </>
  );
}
