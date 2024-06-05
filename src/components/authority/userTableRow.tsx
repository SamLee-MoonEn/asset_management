import { userType } from "../../interface/Interface";

export default function UserTableRow({
  user,
  showModal,
  isManager,
}: {
  user: userType;
  showModal: (modalData: userType, isAdmin: boolean) => void;
  isManager: boolean;
}) {
  return (
    <tr
      className="hover:bg-slate-500 hover:text-white transition-all text-center"
      onClick={() => showModal(user, isManager)}
    >
      <td>{user.name}</td>
      <td>{user.email}</td>
      <div className="flex items-center justify-center h-[45px]">
        <td className={isManager ? "badge badge-accent" : ""}>
          {isManager ? `관리자` : ``}
        </td>
      </div>
    </tr>
  );
}
