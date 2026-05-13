import React, { useEffect, useRef } from "react";
import { FaCartArrowDown } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiLogIn, FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { ProfileActions } from "../../../../store/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import { logout } from "../../../../store/authSlice";

const RightNav = () => {
  const { cart } = useAppSelector((state: RootState) => state);
  const isDropDown = useAppSelector((state: RootState) => state.profile.isDropDown);
  const dispatch = useAppDispatch();
  const user = localStorage.getItem("token");

  const handleDropDown = (e) => {
    e.stopPropagation();
    dispatch(ProfileActions.toggleDropDown());
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the dropdown, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(ProfileActions.closeDropDown());
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(logout())
    localStorage.removeItem("token");
  }

  

  return (
    <div className="md:flex items-center z-10 gap-7 hidden ">
      {/* nav  */}
      <ul className="flex items-center gap-7 text-sm tracking-wide text-[#2A2C30]">
        <Link to="/" className="group relative">
          <li className="font-bold cursor-pointer transition-colors duration-200 hover:text-[#535bf2]">
            HOME
          </li>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#535bf2] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/about" className="group relative">
          <li className="font-bold cursor-pointer transition-colors duration-200 hover:text-[#535bf2]">
            ABOUT
          </li>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#535bf2]"></span>
        </Link>
        <Link to="/product" className="group relative">
          <li className="font-bold cursor-pointer transition-colors duration-200 hover:text-[#535bf2]">
            PRODUCTS
          </li>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#535bf2]"></span>
        </Link>
        <Link to="/contact" className="group relative">
          <li className="font-bold cursor-pointer transition-colors duration-200 hover:text-[#535bf2]">
            CONTACTS
          </li>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#535bf2]"></span>
        </Link>
      </ul>

      <div
        className="relative"
        onClick={handleDropDown}
        ref={dropdownRef}
      >
        <button className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[#2A2C30] shadow-sm transition-all duration-200 hover:border-[#535bf2] hover:text-[#535bf2] hover:shadow-md">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F6FB]">
            <CgProfile className="text-xl" />
          </span>
          <span className="text-sm font-semibold">{user ? "Account" : "Sign in"}</span>
          <RiArrowDropDownLine className={`text-2xl transition-transform duration-200 ${isDropDown ? "rotate-180" : ""}`} />
        </button>
        {isDropDown ? (
          <div
            className={`absolute right-0 top-14 w-56 overflow-hidden rounded-lg border border-slate-100 bg-white py-2 text-[#2A2C30] shadow-xl shadow-slate-200/70 ${isDropDown ? "opacity-100 transition-all duration-300" : "opacity-0 transition-all duration-300"}`}
          >
            <div className="border-b border-slate-100 px-4 pb-3 pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {user ? "My Store" : "Welcome"}
              </p>
              <p className="mt-1 text-sm font-bold text-[#2A2C30]">
                {user ? "Manage your account" : "Access your account"}
              </p>
            </div>
            {!user && (
              <>
                <Link to="/signIn">
                  <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold duration-200 hover:bg-[#F4F6FB] hover:text-[#535bf2]">
                    <FiLogIn className="text-lg" />
                    Login
                  </div>
                </Link>
                <Link to="/register">
                  <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold duration-200 hover:bg-[#F4F6FB] hover:text-[#535bf2]">
                    <FiUser className="text-lg" />
                    Register
                  </div>
                </Link>
              </>
            )}
            {
              user && (
                <>
                <Link to="/profile">
                  <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold duration-200 hover:bg-[#F4F6FB] hover:text-[#535bf2]" >
                    <FiUser className="text-lg" />
                    Profile
                  </div>
                </Link>
                <Link to="/signIn">
                  <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 duration-200 hover:bg-red-50" onClick={handleLogout}>
                    <MdLogout className="text-lg" />
                    Logout
                  </div>
                </Link>
                </>
              )
            }
          </div>
        ) : null}
      </div>

      <Link to="/add-to-cart">
        <button className="relative flex cursor-pointer items-center gap-2 rounded-full bg-[#2A2C30] px-5 py-3 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1F2125] hover:shadow-lg">
          <FaCartArrowDown className="text-[19px]" />
          <span className="text-sm font-semibold">Cart</span>
          <sup className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#535bf2] px-1.5 text-xs font-bold text-white ring-2 ring-white">
            {cart.cartItem.length}
          </sup>
        </button>
      </Link>
    </div>
  );
};

export default RightNav;

