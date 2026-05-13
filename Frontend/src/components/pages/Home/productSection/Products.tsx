import React, { useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import { ProductAction } from "../../../../store/ProductSlice";
import { CartActions } from "../../../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const product = useAppSelector((state: RootState) => state.product.productItem);
  // const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  


  const handleIncrement = (item) => {
    dispatch(ProductAction.increment(item));
  };

  const handleDecrement = (item) => {
    dispatch(ProductAction.decrement(item));
  };
  const handleCart = (item) => {
    if (!user){
      navigate('/signIn')
      alert("First you have to signIn then you can do add to cart")
      return;
    }
    else{
      dispatch(CartActions.addToCArt(item));
      dispatch(ProductAction.disableButtom(item));
    }
  };

  const stockFull = useAppSelector((state: RootState) => state.product.stockFull);

  useEffect(() => {
  if (stockFull === true) {
    const hasShown = localStorage.getItem("alert_shown");

    if (!hasShown) {
      alert("Stock is full");
      localStorage.setItem("alert_shown", "true");
    }
  }
}, [stockFull]);


  return (
    <div className="w-full  bg-inherit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 md:my-15  justify-between">
      {product?.map((item, index) => (
        <div
          key={index}
          data-aos="zoom-in"
          data-aos-duration="800"
          data-aos-delay="0"
          data-aos-easing="ease-out"
          className="bg-white rounded-md shadow-xl w-full h-full
      shadow-gray-300 p-3 relative flex flex-col justify-between items-start gap-2"
        >
          <span className=" bg-[#E9D6D6] py-0.5 px-2  tracking-wider rounded-2xl">
            {item?.category}
          </span>
          <div className="h-[255px] md:h-[300px] w-full flex items-center">
            <img src={`/images/${item?.image}`} className="h-full w-full" alt="" />
          </div>
          <h1 className="text-3xl font-semibold ">{item?.name}</h1>
          <div className="flex gap-1 text-yellow-300 py-3">
            {[...Array(5)].map((__dirname, index) => (
              <FaStar key={index} />
            ))}
          </div>
          <div className="min-h-[70px]">
            <p className="text-gray-700 tracking-wide font-normal  ">
              {item?.description}
            </p>
          </div>
          <div className="flex gap-4 py-4">
            <h3
              className="text-xl 
         "
            >
              RS: {item?.price} $
            </h3>
            <h3 className="line-through text-xl">RS: {item?.orgPrice} $</h3>
          </div>
          <h3 className="text-lg">Total Stocks Available: {item?.stock}</h3>
          <div className="flex items-center gap-4 py-4">
            <h3 className="text-lg font-semibold">Quantity(Pieces)</h3>
            <div className="flex   relative">
              <button
                className="px-4  border border-gray-300 rounded-l-lg text-xl font-bold cursor-pointer"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
              <p className="px-4  border border-x-0 border-gray-300  text-xl font-bold">
                {item.quantity}
              </p>
              <button
                className="cursor-pointer px-4  border border-gray-300 rounded-r-lg text-xl font-bold relative"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>
            </div>
          </div>
          <div className="relative w-full">
        
              <button
                key={index}
                className={` 
              ${
                (item?.addToCart) 
                  ? "bg-white text-black opacity-40"
                  : "bg-[#292C30] text-white"
              }
              relative hover:scale-none mt-2 mb-5 border-2 border-black curser-pointer w-full  flex gap-3 justify-center md:justify-center items-center  rounded-md px-7 py-2 duration-200  hover:bg-white group hover:border-2 `}
                onClick={() => handleCart(item)}
              >
                <FaCartArrowDown className="text-inherit text-[20px] group-hover:text-black" />
                <h1 className="text-inherit text-[20px] group-hover:text-black">
                  Add To Cart
                </h1>
              </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

