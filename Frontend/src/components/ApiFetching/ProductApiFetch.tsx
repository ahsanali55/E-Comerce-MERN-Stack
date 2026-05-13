import React, { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../../hooks/hook";
import { ProductAction } from "../../store/ProductSlice";

const ProductApiFetch = () => {
  const dispatch = useAppDispatch();
  // console.log(dispatch)

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get("/data/products.json", {
          signal: controller.signal,
        });
        // console.log("Data:", response.data);
        const Data = response.data;
        dispatch(ProductAction.fetchedData(Data));
      } catch (err) {
        console.log("Error:", err);
      } finally {
        // console.log("Finally, response a gya");
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return <></>;
};

export default ProductApiFetch;

