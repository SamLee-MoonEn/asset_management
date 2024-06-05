import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import microsoftLoginIcon from "../assets/ms-symbollockup_signin_light.png";
import {
  createNewAccount,
  getAdminList,
  getMicrosoftLoginInfo,
} from "../api/firebaseRealtimeDBAPI";
import { userInfoState } from "../store/userInfo";

export default function HomePage() {
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userInfoState);

  const handleAdminList = async () => {
    try {
      const adminList = await getAdminList();
      const userUid = localStorage.getItem("USER_UID");
      localStorage.setItem(
        "isAdmin",
        adminList[userUid ? userUid : "Empty"] ? "true" : "false"
      );
      console.log(`[Success] handleAdminList ${new Date()}: Success Set Value`);
    } catch (error) {
      console.log(`[Error] handleAdminList ${new Date()}: ${error}`);
    }
  };

  const handleLogin = async () => {
    try {
      const userInfo = await getMicrosoftLoginInfo();
      const tempUserInfo = {
        displayName: userInfo?.displayName as string,
        email: userInfo?.email as string,
        uid: userInfo?.uid as string,
      };
      setUser(tempUserInfo);
      await createNewAccount(tempUserInfo);
      localStorage.setItem("isLogin", "true");
      handleAdminList();
      setTimeout(() => {
        navigate("/search");
      }, 500);
      console.log(`[Success] handleLogin ${new Date()}: Login Successful`);
    } catch (error) {
      console.error(`[Error] handleLogin ${new Date()}: ${error}`);
    }
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("isLogin") || "false";
    const loginUid = localStorage.getItem("USER_UID") || "";
    if (loginUid && JSON.parse(loginCheck)) {
      navigate("/search");
      console.log(`[Success] Login ${new Date()}: Already logged in`);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="w-10/12 ml-[210px]">
        <div className="mx-auto mt-96 w-fit">
          <button onClick={handleLogin}>
            <img src={microsoftLoginIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
