import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import { CartActions } from "../../../../store/cartSlice";
import { ProductAction } from "../../../../store/ProductSlice";

const Items = () => {
  const { cartItem, stockFull } = useAppSelector((state: RootState) => state.cart);
  console.log("Item at Cartssss: ", cartItem);
  const dispatch = useAppDispatch();

  const handleRemove = (item) => {
    dispatch(CartActions.removeItemFromCArt(item));
    dispatch(ProductAction.enableButton(item));
  };

  const handleCartIncrement = (item) => {
    dispatch(CartActions.incrementCartQuantity(item));
  };
  const handleCartDecrement = (item) => {
    dispatch(CartActions.decrementCartQuantity(item));
  };

  useEffect(() => {
    if (stockFull === true) {
      const hasShow = localStorage.getItem("alert_shown");

      if (!hasShow) {
         alert("Stock is full");
        localStorage.setItem("alert_shown", "true");
      }
    }
  });

  return (
    <div className={`w-full border ${(cartItem.length > 0) ? "border-gray-300 border-b-0" : "border-none"} sm:mt-4 `}>
      {cartItem?.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:justify-evenly lg:justify-between px-3 py-5 border-b border-gray-300 duration-300"
        >
          {/* Left */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-7 ">
            <div className="bg-[#E9D6D6] rounded-3xl px-3 text-[13px] opacity-80">
              {item?.category}
            </div>
            <img src={`/images/${item?.image}`} className=" w-50 md:w-30" alt="" />
            <h1 className="text-[30px] md:text-[22px] font-semibold text-[#292C30]">
              {item?.name}
            </h1>
          </div>
          {/* Right */}
          <div className="flex flex-col lg:flex-row lg:items-center mt-4 md:mt-0 md:items-start items-center gap-7">
            <h3 className="text-[20px] md:text-[18px] lg:flex lg:space-x-2 text-gray-500 lg:mr-12">
              <span>{item?.price.toString().split(".")[0]}</span> <span className="inline">$</span>
            </h3>
            <div className="flex items-center">
              <button
                className="border border-gray-300 rounded-l-lg px-8 py-2 font-semibold "
                onClick={() => handleCartIncrement(item)}
              >
                +
              </button>
              <h3 className="border border-gray-300 border-x-0  px-10 py-2 font-semibold">
                {item?.quantity}
              </h3>
              <button
                className="border border-gray-300 rounded-r-lg px-8 py-2 font-semibold tracking-widest "
                onClick={() => handleCartDecrement(item)}
              >
                -
              </button>
            </div>
            <button
              className="border-2 text-white px-23 bg-[#292C30] hover:border-2 hover:border-[#292C30] hover:bg-white hover:text-[#292C30] duration-75 lg:px-15 py-2 rounded-md"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;

