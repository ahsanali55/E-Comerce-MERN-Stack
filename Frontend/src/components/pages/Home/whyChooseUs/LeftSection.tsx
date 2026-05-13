import React, { useEffect } from "react";
import { useAppSelector } from "../../../../hooks/hook";
import AOS from "aos";

const LeftSection = () => {
  const left = useAppSelector((state: RootState) => state.whyChoose.left);
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out",  });
  }, []);
  return (
    <div className="max-w-[330px] lg:order-1 md:order-1 " >
      {left.map((item, index) => (
        <div className="flex flex-col gap-3 pb-7" key={index} data-aos="zoom-in-up" data-aos-duration="1000" 
        data-aos-delay="0"
       >
          <div  className="relative rounded-full bg-[#edf2f8] w-14 flex justify-center items-center h-14">
            <p className="text-2xl text-[#4850ee]">{item.id}</p>
          </div>
          <h3 className="font-semibold text-xl">{item.title}</h3>
          <p className="text-gray-400 text-[16px]">
           {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LeftSection;

