import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const firebaseStorage = getStorage(app);

// 이미지 업로드
export const uploadPartsImage = async (file: File) => {
  try {
    const storageRef = ref(firebaseStorage, "partsImage/" + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log(`[Success] uploadPartsImage ${new Date()}: 업로드 완료`);
    return url;
  } catch (error) {
    console.error(`[Error] uploadPartsImage ${new Date()}: ${error}`);
  }
};
