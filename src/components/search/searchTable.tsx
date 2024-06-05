import { assetsDataType } from "../../interface/Interface";
import SearchTableRow from "./searchTableRow";

export default function SearchTable({
  assetsData,
  showModal,
}: {
  assetsData: assetsDataType[];
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
          {assetsData.map((v, i) => (
            <SearchTableRow item={v} key={i} showModal={showModal} />
          ))}
        </tbody>
      </table>
    </>
  );
}
