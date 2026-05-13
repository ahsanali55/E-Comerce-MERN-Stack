import React from "react";
import { useAppSelector } from "../../../../hooks/hook";

const RightFooter = () => {
  const footerValue = useAppSelector((state: RootState) => state.footer);
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-7 gap-4 md:gap-0 justify-between ">
      {
        <div className="space-y-4 text-white">
          <h1 className="text-xl font-semibold">
            {footerValue.shopping.title} 
          </h1>
          <ul className="flex flex-col gap-3">
            {footerValue.shopping.value.map((value, index) => (
              <a href="" key={index}>
                <li className="hover:underline hover:text-[#4191c7] text-[14px] text-gray-300">
                  {value}
                </li>
              </a>
            ))}
          </ul>
        </div>
      }

      <div className="space-y-4 text-white">
        <h1 className="text-xl font-semibold">
          {footerValue.experience.title}
        </h1>
        <ul className="flex flex-col gap-3">
          {footerValue.experience.value.map((value, index) => (
            <a href="" key={index}>
              <li className="hover:underline hover:text-[#7DACF3] text-[14px] text-gray-300">{value}</li>
            </a>
          ))}
        </ul>
      </div>

      <div className="space-y-4 text-white max-w-[220px]">
        <h1 className="text-xl font-semibold">
          {footerValue.newsLetter.title}
        </h1>
        <p className="text-[14px] text-gray-300">{footerValue.newsLetter.description}</p>
        <div className="bg-[#1E1F23] p-2 relative">
          <input
            type="email"
            className="border-none outline-none"
            placeholder="Your Email"
          />
          <div className="w-full bg-white h-0.5 rounded-2xl absolute bottom-0 left-0"></div>
        </div>
      </div>

    </div>
  );
};

export default RightFooter;

