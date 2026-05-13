import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useAppSelector } from "../../../../hooks/hook";
import { Link } from "react-router-dom";
const LeftHero = () => {
  const heroValue = useAppSelector((state: RootState) => state.hero);

  return (
    <div className="w-full  space-y-4 " 
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-delay="0"
    >
      <h3 className="text-[#003b99] text-[20px] tracking-wider font-semibold ">
       {heroValue.title}
      </h3>
      <h1 className="text-[#2a2c30] tracking-tight text-[35px] md:text-[48px] leading-15 font-bold ">
        {heroValue.mainTitle}
      </h1>
      <p className="text-white">
       {heroValue.description}
      </p>
      <Link to="/product"
      
      >
        <button className="flex items-center text-white px-3 md:px-5 py-2 mt-8 bg-[#2a2c30] rounded-md  cursor-pointer gap-2 duration-500 transition-all hover:scale-105 ">
         {heroValue.btnName}
          <RiArrowRightSLine className="" />
        </button>
      </Link>
    </div>
  );
};

export default LeftHero;

