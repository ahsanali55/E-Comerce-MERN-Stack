import React from "react";
import { useAppSelector } from "../../../../hooks/hook";

const RightHero = () => {
  const heroValue = useAppSelector((state: RootState) => state.hero)
  return (
    <div className="w-full relative"
    data-aos="fade-up"
    data-aos-duration='1000'
    data-aos-delay="200"
    >
      <img src={`/images/${heroValue.image}`} className="" alt="" />
    </div>
  );
};

export default RightHero;

