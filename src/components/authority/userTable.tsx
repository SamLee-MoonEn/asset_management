import { userType } from "../../interface/Interface";
import UserTableRow from "./userTableRow";

export default function UserTable({
  userData,
  showModal,
  adminList,
}: {
  userData: userType[];
  showModal: (modalData: userType, isAdmin: boolean) => void;
  adminList: string[];
}) {
  return (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Email</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((v, i) => (
            <UserTableRow
              user={v}
              key={i}
              showModal={showModal}
              isManager={adminList.includes(v.uid)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
