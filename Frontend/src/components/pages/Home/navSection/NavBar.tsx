import React from "react";
import { useAppDispatch } from "../../../../hooks/hook";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import RightNav from "./RightNav";
import LeftNav from "./LeftNav";
import { NavbarActions } from "../../../../store/navSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();

  const handleSidebar = () => {
    dispatch(NavbarActions.ShowSideBar());
  };

  return (
    <div className="w-full h-full bg-white  z-50">
      {/* === Navbar === */}
      <nav className="w-11/12  max-w-[1080px]  flex justify-between items-center p-2 md:p-4 mx-auto  ">
        {/* === logo === */}
        <LeftNav />

        {/* === right section === */}
        <RightNav />
        {/* Hambuger Icon  */}
        <div className="w-full md:hidden   ">
          <GiHamburgerMenu
            className=" text-3xl ml-auto"
            onClick={handleSidebar}
          />
          <SideBar />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

