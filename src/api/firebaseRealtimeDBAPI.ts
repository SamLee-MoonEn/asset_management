import { initializeApp } from "firebase/app";
import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDatabase, update, ref, get, child } from "firebase/database";

import {
  userInfoUpdatesProps,
  userInfoProps,
  adminListUpdateProps,
  adminListRemoveProps,
  assetUpdateProps,
  assetsDataType,
} from "../interface/Interface";

const firebaseConfig = {
  apiKey: "AIzaSyABb7AwZJxTnJ-x2IumRnfqfAn2gVKN8_Y",
  authDomain: "ts-asset-management.firebaseapp.com",
  databaseURL:
    "https://ts-asset-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ts-asset-management",
  storageBucket: "ts-asset-management.appspot.com",
  messagingSenderId: "274133663618",
  appId: "1:274133663618:web:66936e503307ccf50e599b",
  measurementId: "G-VRYY40QFXQ",
};

const app = initializeApp(firebaseConfig);
const firebasedb = getDatabase(app);
const auth = getAuth();

const userUid = localStorage.getItem("USER_UID");

// microsoft 로그인
export const getMicrosoftLoginInfo = async () => {
  try {
    const provider = new OAuthProvider("microsoft.com");
    const result = await signInWithPopup(auth, provider);
    console.log(
      `[Success] getMicrosoftLoginInfo ${new Date()}: Getting a login info is Successful`
    );
    return result.user;
  } catch (error) {
    console.error(`[Error] getMicrosoftLoginInfo ${new Date()}: ${error}`);
  }
};

// 계정 데이터 등록
export const createNewAccount = async (userInfo: userInfoProps) => {
  try {
    const updates: userInfoUpdatesProps = {};
    updates[`userInfo/${userInfo.uid}`] = {
      uid: userInfo.uid,
      name: userInfo.displayName,
      email: userInfo.email,
    };
    update(ref(firebasedb), updates);
    console.log(`[Success] createNewAccount ${new Date()}: 계정등록 완료`);
  } catch (error) {
    console.error(`[Error] createNewAccount ${new Date()}: ${error}`);
  }
};

// 특정 계정 데이터 불러오기
export const getSpecificUserData = async (uid: string) => {
  try {
    const data = await get(child(ref(firebasedb), `userInfo/${uid}/`));
    const userData = await data.val();
    console.log(
      `[Success] getSpecificUserData ${new Date()}: 계정 불러오기 완료`
    );
    return userData;
  } catch (error) {
    console.error(`[Error] getSpecificUserData ${new Date()}: ${error}`);
  }
};

// 계정 데이터 불러오기
export const getUserData = async () => {
  try {
    const data = await get(child(ref(firebasedb), "userInfo/"));
    const userData = await data.val();
    console.log(`[Success] getUserData ${new Date()}: 계정 불러오기 완료`);
    return userData;
  } catch (error) {
    console.error(`[Error] getUserData ${new Date()}: ${error}`);
  }
};

// 관리자 권한 비교
export const getAdminList = async () => {
  try {
    const data = await get(child(ref(firebasedb), "adminList"));
    const adminList = await data.val();
    console.log(`[Success] getUserData ${new Date()}: 관리자 불러오기 완료`);
    return adminList;
  } catch (error) {
    console.error(`[Error] getAdminList ${new Date()}: ${error}`);
  }
};

// 관리자 등록
export const registerAdmin = async (uid: string) => {
  try {
    const updates: adminListUpdateProps = {};
    updates[`adminList/${uid}`] = { [uid]: true };
    update(ref(firebasedb), updates);
    console.log(`[Success] createNewAccount ${new Date()}: 계정등록 완료`);
  } catch (error) {
    console.log(`[Error] registerAdmin ${new Date()}: ${error}`);
  }
};

// 관리자 삭제
export const removeAdmin = async (uid: string) => {
  try {
    const updates: adminListRemoveProps = {};
    updates[`adminList/${uid}`] = null;
    update(ref(firebasedb), updates);
    console.log(`[Success] createNewAccount ${new Date()}: 계정등록 완료`);
  } catch (error) {
    console.log(`[Error] registerAdmin ${new Date()}: ${error}`);
  }
};

// 자산 등록
export const creatAsset = async (data: assetUpdateProps) => {
  try {
    const itemId = data.serial
      ? `${data.itemCode}-${data.serial}`
      : data.itemCode;
    const updates: any = {};
    updates[`assets/${itemId}`] = {
      itemCode: data.itemCode,
      itemName: data.itemName,
      specification: data.specification,
      serial: data.serial,
      stock: data.stock,
      status: true,
      itemImage: data.itemImage,
    };
    update(ref(firebasedb), updates);
    console.log(`[Success] creatAsset ${new Date()}: 자산 등록 완료`);
    alert("자산 등록이 완료되었습니다.");
  } catch (error) {
    console.error(`[Error] creatAsset ${new Date()}: ${error}`);
    alert("자산 등록에 실패하였습니다. 다시 시도해주세요.");
  }
};

// 자산 가져오기
export const getAssetsData = async () => {
  try {
    const data = await get(child(ref(firebasedb), "assets/"));
    const assetsData: assetsDataType[] = Object.values(data.val());
    console.log(`[Success] getAssetsData ${new Date()}: 자산 불러오기 완료`);
    return assetsData;
  } catch (error) {
    console.log(`[Error] getAssetsData ${new Date()}: ${error}`);
    alert("자산 불러오기에 실패하였습니다. 새로고침해주세요.");
  }
};
