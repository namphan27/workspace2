import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (!query) return;

    const searchResults = async () => {
      const response = await axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}`);
      setResult(response.data.products);
    };
    searchResults();
  }, [query]);
  return <div className="ml-[10%]">
      <h2>Kết quả tìm kiếm: {query}</h2>
      {result.map(p => (
        <div key={p.id}>
          <h3 className="font-bold">{p.title}</h3>
          <img src={p.thumbnail} alt="" />
        </div>
      ))}
    </div>;
}
