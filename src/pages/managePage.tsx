import { useEffect, useState, useRef } from "react";

import ManageTable from "../components/management/manageTable";
import SearchBarForManage from "../components/management/searchBarForManage";
import ManageModal from "../components/management/manageModal";

import { assetsDataType } from "../interface/Interface";
import AssetRegisterModal from "../components/management/assetRegisterModal";
import { getAssetsData } from "../api/firebaseRealtimeDBAPI";

export default function ManagePage() {
  const [searchText, setSearchText] = useState("");
  const [rawAssetsData, setRawAssetsData] = useState<assetsDataType[]>([]);
  const [filteredData, setFilteredData] = useState<assetsDataType[]>([]);
  const [modalData, setModalData] = useState<assetsDataType>();
  const [isNotRental, setIsNotRental] = useState(false);
  const showModalRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showModal = (showModalData: assetsDataType | null) => {
    if (showModalRef.current) showModalRef.current.checked = true;
    if (showModalData === null) return;
    setModalData(showModalData);
  };

  const closeModal = () => {
    if (showModalRef.current) showModalRef.current.checked = false;
  };

  const showDialogModal = () => {
    dialogRef.current?.showModal();
  };

  const getAssetsDataFromDB = async () => {
    try {
      const data: assetsDataType[] | undefined = await getAssetsData();
      if (data) {
        setRawAssetsData(data);
      }
    } catch (error) {
      console.log(`[Error] getAssetsDataFromDB ${new Date()}: ${error}`);
    }
  };

  // 데이터를 받아오는 함수를 컴포넌트가 마운트 될 때 한 번만 실행하도록 함.
  useEffect(() => {
    getAssetsDataFromDB();
  }, []);

  useEffect(() => {
    const filteredTestData = rawAssetsData.filter(
      (data) =>
        data.itemCode.toLowerCase().includes(searchText.toLowerCase()) ||
        data.itemName.toLowerCase().includes(searchText.toLowerCase()) ||
        data.specification.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(
      filteredTestData.filter((data) =>
        isNotRental === true
          ? data.status === true
          : data.status === false || true
      )
    );
  }, [searchText, isNotRental, rawAssetsData]);

  return (
    <>
      <div className="w-11/12 ml-auto">
        <SearchBarForManage
          getSearchText={setSearchText}
          getIsRental={setIsNotRental}
        />
        <div className="overflow-x-auto w-full">
          <ManageTable testData={filteredData} showModal={showModal} />
        </div>

        <input
          type="checkbox"
          id="my_modal_7"
          className="modal-toggle"
          ref={showModalRef}
        />
        <ManageModal modalData={modalData} closeModal={closeModal} />
        <div className="flex justify-end mr-4 mt-4">
          <button
            className="btn bg-light text-white hover:text-black"
            onClick={showDialogModal}
          >
            자산 등록
          </button>
          <div>
            <AssetRegisterModal dialogRef={dialogRef} />
          </div>
        </div>
      </div>
    </>
  );
}
