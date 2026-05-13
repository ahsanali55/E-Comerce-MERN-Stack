import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import { NavbarActions } from "../../../../store/navSlice";

const IsShow = () => {
  const isShow = useAppSelector((state: RootState) => state.navbar.isShow);
  const dispatch = useAppDispatch();

  const handleHideSidebar = () => {
    console.log("Clicked")
    dispatch(NavbarActions.ShowSideBar());
  };

  return (
    <>
      {isShow ? (
        <>
          <div
            className="fixed  transition-all duration-1000 top-0 z-40 w-full h-full bg-gray-300 opacity-60"
            onClick={handleHideSidebar}
          ></div>{" "}
        </>
      ) : null}
    </>
  );
};

export default IsShow;

