import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import LeftNav from "../../Home/navSection/LeftNav";

const ProfileNavbar = () => {
  return (
    <section className="w-full border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto flex w-11/12 max-w-[1080px] items-center justify-between p-4 font-semibold">
        <div className="flex items-center gap-7">
          <LeftNav />
          <Link to="/">
            <h1 className="text-sm font-bold uppercase tracking-wide text-[#2A2C30] transition-colors duration-200 hover:text-[#535bf2]">Home</h1>
          </Link>
          <Link to="/add-to-cart" >
            <h1 className="text-sm font-bold uppercase tracking-wide text-[#2A2C30] transition-colors duration-200 hover:text-[#535bf2]">Cart</h1>
          </Link>
          <h1 className='text-sm font-bold uppercase tracking-wide text-[#535bf2]'>Orders</h1>
        </div>
        <Logout />
      </div>
    </section>
  );
};

export default ProfileNavbar;

