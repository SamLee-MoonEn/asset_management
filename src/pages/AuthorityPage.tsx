import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getAdminList,
  getUserData,
  registerAdmin,
  removeAdmin,
} from "../api/firebaseRealtimeDBAPI";
import UserTable from "../components/authority/userTable";
import SearchBar from "../components/search/searchBar";

import { userType } from "../interface/Interface";
import AuthorityModal from "../components/authority/authorityModal";

export default function AuthorityPage() {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState<userType[]>([]);
  const [filteredUserData, setFilteredUserData] = useState<userType[]>([]);
  const [adminList, setAdminList] = useState<string[]>([]);
  const [modalData, setModalData] = useState<userType>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [, setOnlyAdmin] = useState(false);
  const showModalRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const showModal = (showModalData: userType, isAdmin: boolean) => {
    if (showModalRef.current) showModalRef.current.checked = true;
    setModalData(showModalData);
    setIsAdmin(isAdmin);
  };

  const {} = useQuery("getUserData", getUserData, {
    onSuccess: (data) => {
      setUserData(Object.values(data));
    },
  });

  const {} = useQuery("getAuthorityList", getAdminList, {
    onSuccess(data) {
      setAdminList(Object.keys(data));
    },
  });

  useEffect(() => {
    setFilteredUserData(
      userData.filter(
        (data) =>
          data.name.toLowerCase().includes(searchText.toLowerCase()) ||
          data.email.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [userData, searchText]);

  const handleRegisterAuthority = useMutation(registerAdmin, {
    onSuccess: () => {
      alert("관리자 권한이 등록 되었습니다.");
      if (!showModalRef.current) return;
      showModalRef.current.checked = false;
      queryClient.invalidateQueries("getUserData");
      queryClient.invalidateQueries("getAuthorityList");
    },
    onError: (error) => {
      alert(`에러가 발생했습니다.\n${error}`);
    },
  });

  const handleRemoveAuthority = useMutation(removeAdmin, {
    onSuccess: () => {
      alert("관리자 권한이 삭제되었습니다.");
      if (!showModalRef.current) return;
      showModalRef.current.checked = false;
      queryClient.invalidateQueries("getUserData");
      queryClient.invalidateQueries("getAuthorityList");
    },
    onError: (error) => {
      alert(`에러가 발생했습니다.\n${error}`);
    },
  });

  return (
    <>
      <div className="w-11/12 ml-auto">
        <SearchBar
          toggleTitle="관리자"
          getSearchText={setSearchText}
          getIsRental={setOnlyAdmin}
        />
        <div className="overflow-x-auto w-full">
          <UserTable
            userData={filteredUserData}
            showModal={showModal}
            adminList={adminList}
          />
        </div>

        <input
          type="checkbox"
          id="my_modal_7"
          className="modal-toggle"
          ref={showModalRef}
        />
        <AuthorityModal
          modalData={modalData}
          isAdmin={isAdmin}
          register={handleRegisterAuthority}
          remove={handleRemoveAuthority}
        />
      </div>
    </>
  );
}
