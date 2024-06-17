import { NavLink, useNavigate } from "react-router-dom";

import kohyoungIcon from "../../assets/kohyoung_icon.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [authorization, setAuthorization] = useState(
    localStorage.getItem("isAdmin")
  );
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("isLogin", "");
    localStorage.setItem("USER_UID", "");
    localStorage.setItem("isAdmin", "");
    navigate("/");
  };
  useEffect(() => {
    setAuthorization(localStorage.getItem("isAdmin"));
  });

  return (
    <nav className="relative z-50">
      <div className="h-screen w-1/12 min-w-max fixed top-0 left-0 bg-main">
        <div className="flex flex-col mt-10 text-sm md:text-lg ">
          <NavLink
            to="/"
            className="flex justify-center mb-10 items-center mx-2"
          >
            <img src={kohyoungIcon} className="w-10" />
            <span className="text-white ml-1 text-sm">Asset Management</span>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `p-4 hover:bg-gray-300 hover:text-black transition-all text-center ${
                isActive ? "text-black bg-gray-300" : "text-white"
              }`
            }
          >
            <span>자산 검색/대여</span>
          </NavLink>
          {authorization === "true" && (
            <NavLink
              to="/management"
              className={({ isActive }) =>
                `p-4 hover:bg-gray-300 hover:text-black transition-all text-center ${
                  isActive ? "text-black bg-gray-300" : "text-white"
                }`
              }
            >
              <span>자산 관리</span>
            </NavLink>
          )}
          {authorization === "true" && (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `p-4 hover:bg-gray-300 hover:text-black transition-all text-center ${
                  isActive ? "text-black bg-gray-300" : "text-white"
                }`
              }
            >
              <span>관리자 메뉴</span>
            </NavLink>
          )}
        </div>
        <div className="absolute bottom-10 w-full flex justify-center">
          <button
            className="btn btn-outline text-white w-11/12"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
}
