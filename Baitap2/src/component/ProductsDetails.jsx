import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

export default function ProductsDetails() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await axiosInstance.get(`/products/${id}`);

        setProductDetail(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
        <p className="text-3xl font-bold">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-10 text-center text-4xl font-bold text-red-500">
        Đã có lỗi: {isError}
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="text-center text-5xl font-bold">Chi tiết sản phẩm</h3>
      <article className="ml-[10%]">
        <img src={productDetail.thumbnail} alt="" />
        <div className="flex gap-2 mt-4">
          {(productDetail.images).map((item, index) => (
            <img
              key={index}
              src={item}
              alt={`Image ${index}`}
              className="w-16 h-16 object-cover rounded border cursor-pointer"
            />
          ))}
        </div>

        <h3 className="font-bold">{productDetail.title}</h3>
        <p>{productDetail.description}</p>
      </article>
    </div>
  );
}
