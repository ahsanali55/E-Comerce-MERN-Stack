import React from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import { FaHome } from "react-icons/fa";
import { RiAlignItemRightFill } from "react-icons/ri";
import { MdRoundaboutRight } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

import { Link } from "react-router-dom";
import { NavbarActions } from "../../../../store/navSlice";
import IsShow from "./IsShow";

const SideBar = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const isShow = useAppSelector((state: RootState) => state.navbar.isShow);
  const dispatch = useAppDispatch();

  const handleHideSidebar = () => {
    dispatch(NavbarActions.ShowSideBar());
  };

  return (
    <>
      <div
        className={`absolute   w-full  h-screen  bg-[#22263F] z-9999 rounded-md py-3 px-4 flex flex-col gap-5 transition-all linear delay-150 ease-in-out  ${
          isShow
            ? "opacity-100 translate-x-0 top-29 left-0  duration-700"
            : " opacity-100 translate-x-0  -left-[800px] top-29  duration-500"
        } `}
      >
        <div className="relative">
          <MdCancel
            className="absolute right-0 text-2xl text-white"
            onClick={handleHideSidebar}
          />
        </div>
        {/* nav  */}
        <ul
          className="text-white flex flex-col  pt-3 gap-5"
          onClick={handleHideSidebar}
        >
          <Link to="/" className="group relative">
            <li className="font-semi-bold flex items-center space-x-3 ">
              {" "}
              <FaHome className="text-lg" />
              <span> HOME</span>
            </li>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#535bf2] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="group relative">
            <li className="font-semi-bold flex items-center space-x-3 ">
              <MdRoundaboutRight />
              <span> ABOUT</span>
            </li>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#535bf2]"></span>
          </Link>
          <Link to="/product" className="group relative">
            <li className="font-semi-bold flex items-center space-x-3 ">
              <RiAlignItemRightFill />
              <span>PRODUCTS </span>
            </li>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#535bf2]"></span>
          </Link>
          <Link to="/contact" className="group relative">
            <li className="font-semi-bold flex items-center space-x-3 ">
              <RiContactsFill />
              <span>CONTACTS</span>
            </li>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#535bf2]"></span>
          </Link>
        </ul>
        <Link to="/add-to-cart" onClick={handleHideSidebar}>
          <button className="flex w-full justify-start items-center   border-gray-400   rounded pb-2  relative cursor-pointer duration-300">
            <FaCartArrowDown className=" text-[20px] text-white" />
            <sup className="absolute top-0 text-white left-6 font-bold">
              {cart.cartItem.length}
            </sup>
            <span className="text-white tracking-wider text-lg pl-4">
              Cart Items
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default SideBar;

