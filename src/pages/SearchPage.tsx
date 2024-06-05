import { useEffect, useState, useRef } from "react";

import SearchTable from "../components/search/searchTable";
import SearchBar from "../components/search/searchBar";

import { assetsDataType } from "../interface/Interface";
import SearchModal from "../components/search/searchModal";
import { getAssetsData } from "../api/firebaseRealtimeDBAPI";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [rawAssetsData, setRawAssetsData] = useState<assetsDataType[]>([]);
  const [filteredData, setFilteredData] = useState<assetsDataType[]>([]);
  const [modalData, setModalData] = useState<assetsDataType>();
  const [isNotRental, setisNotRental] = useState(false);
  const showModalRef = useRef<HTMLInputElement>(null);

  const showModal = (showModalData: assetsDataType) => {
    if (showModalRef.current) showModalRef.current.checked = true;
    setModalData(showModalData);
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
        <SearchBar
          toggleTitle="대여 제외"
          getSearchText={setSearchText}
          getIsRental={setisNotRental}
        />
        <div className="overflow-x-auto w-full">
          <SearchTable assetsData={filteredData} showModal={showModal} />
        </div>

        <input
          type="checkbox"
          id="my_modal_7"
          className="modal-toggle"
          ref={showModalRef}
        />
        <SearchModal modalData={modalData} />
      </div>
    </>
  );
}
