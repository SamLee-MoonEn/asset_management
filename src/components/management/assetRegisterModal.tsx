import { RefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadPartsImage } from "../../api/firebaseStorageAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { creatAsset } from "../../api/firebaseRealtimeDBAPI";

export default function AssetRegisterModal({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
}) {
  const schema = yup.object({
    itemCode: yup.string().required("필수 입력 값입니다."),
    itemName: yup.string().required("필수 입력 값입니다."),
    itemImage: yup.string(),
    specification: yup.string(),
    serial: yup.string(),
    stock: yup
      .number()
      .typeError("숫자만 입력해주세요.")
      .required("필수 입력 값입니다.")
      .integer("정수만 입력해주세요.")
      .min(0, "0보다 큰 값을 입력해주세요."),
    storage: yup
      .string()
      .oneOf(
        ["4층 서관 Jig 보관함", "기타", "1층 TS 창고", "지하 1층 TS 실습실"],
        "보관 장소를 선택해주세요"
      ),
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [imageUrl, setImageUrl] = useState<string>();

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files == null) return;
    const file = event.target.files[0];
    try {
      const url = await uploadPartsImage(file);
      setImageUrl(url);
      event.target.value = "";
    } catch (error) {
      console.log(`[Error] handleUploadImage ${new Date()}: ${error}`);
    }
  };
  const resetModal = () => {
    reset();
    setImageUrl("");
  };

  const onSubmitAssetData = async (data: any) => {
    await creatAsset(data);
    resetModal();
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  useEffect(() => {
    setValue("itemImage", imageUrl);
  }, [imageUrl]);

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box w-7/12 max-w-5xl">
        <form
          className="w-full flex items-center"
          onSubmit={handleSubmit(onSubmitAssetData)}
        >
          <div className="mb-4">
            {imageUrl ? (
              <img src={imageUrl}></img>
            ) : (
              <input
                type="file"
                className="file-input max-w-4xl w-full"
                onChange={handleUploadImage}
                accept="image/png, image/jpeg, image/bmp"
              />
            )}
          </div>
          <div className="ml-4 w-full">
            <div className="stats shadow w-full">
              <div className="stats stats-vertical shadow">
                <div className="stat place-items-center">
                  <label htmlFor="itemCode" className="stat-title">
                    Item Code
                  </label>
                  <input
                    id="itemCode"
                    {...register("itemCode")}
                    className="input input-bordered"
                  />
                  {errors.itemCode?.message && (
                    <p className="my-2 text-red-400 text-xs">
                      {errors.itemCode?.message}
                    </p>
                  )}
                </div>
                <div className="stat place-items-center">
                  <label htmlFor="itemName" className="divider text-gray-400">
                    Item Name
                  </label>
                  <input
                    id="itemName"
                    {...register("itemName")}
                    className="input input-bordered"
                  />
                  {errors.itemName?.message && (
                    <p className="my-2 text-red-400 text-xs">
                      {errors.itemName?.message}
                    </p>
                  )}
                </div>
                <div className="stat place-items-center">
                  <label
                    htmlFor="specification"
                    className="divider text-gray-400"
                  >
                    Specification
                  </label>
                  <input
                    id="specification"
                    {...register("specification")}
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="stats stats-vertical shadow">
                <div className="stat place-items-center">
                  <label htmlFor="serial" className="divider text-gray-400">
                    Serial
                  </label>
                  <input
                    id="serial"
                    {...register("serial")}
                    className="input input-bordered"
                  />
                </div>
                <div className="stat place-items-center">
                  <label htmlFor="storage" className="divider text-gray-400">
                    보관 위치
                  </label>
                  <select
                    id="storage"
                    {...register("storage")}
                    className="select"
                  >
                    <option value={undefined} hidden>
                      보관 장소를 선택해주세요.
                    </option>
                    <option value="4층 서관 Jig 보관함">
                      4층 서관 Jig 보관함
                    </option>
                    <option value="1층 TS 창고">1층 TS 창고</option>
                    <option value="지하 1층 TS 실습실">
                      지하 1층 TS 실습실
                    </option>
                    <option value="기타">기타</option>
                  </select>
                  {errors.storage?.message && (
                    <p className="my-2 text-red-400 text-xs">
                      {errors.storage?.message}
                    </p>
                  )}
                </div>
                <div className="stat place-items-center">
                  <label htmlFor="stock" className="divider text-gray-400">
                    재고
                  </label>
                  <input
                    id="stock"
                    {...register("stock")}
                    className="input input-bordered text-center"
                  />
                  {errors.stock?.message && (
                    <p className="my-2 text-red-400 text-xs">
                      {errors.stock?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button className="btn mt-4 w-full ml-auto bg-light text-white hover:text-black">
              등록
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={resetModal}>close</button>
      </form>
    </dialog>
  );
}
