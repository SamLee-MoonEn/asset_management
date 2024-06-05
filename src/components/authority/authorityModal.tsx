import { UseMutationResult } from "react-query";
import { userType } from "../../interface/Interface";

export default function AuthorityModal({
  modalData,
  isAdmin,
  register,
  remove,
}: {
  modalData: userType | undefined;
  isAdmin: boolean;
  register: UseMutationResult<void, unknown, string, unknown>;
  remove: UseMutationResult<void, unknown, string, unknown>;
}) {
  // 등록 후 다시 데이터 불러오기(useQuery)
  const registerAuthority = () => {
    if (!modalData?.uid) return;
    register.mutate(modalData?.uid);
  };

  const removeAuthority = () => {
    if (!modalData?.uid) return;
    remove.mutate(modalData.uid);
  };

  return (
    <div className="modal" role="dialog">
      <div className="modal-box w-7/12 max-w-4xl">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-bold">{modalData?.name}</h3>
          <h3 className="text-xl">{modalData?.email}</h3>
          {isAdmin ? (
            <div className="btn btn-error" onClick={removeAuthority}>
              관리자 제외
            </div>
          ) : (
            <div className="btn btn-accent" onClick={registerAuthority}>
              관리자 추가
            </div>
          )}
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="my_modal_7"></label>
    </div>
  );
}
