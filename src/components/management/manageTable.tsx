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
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Item Image</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Specification</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Stock</th>
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
