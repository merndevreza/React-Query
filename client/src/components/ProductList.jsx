import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}?_page=${queryKey[1].pageNumber}&_per_page=6`
  );
  return response.data;
};

const ProductList = ({ onDetails,onDelete }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { pageNumber }],
    queryFn: fetchProducts,
    retry: false, // only one time it will call server if error occurred. retry:3 //(default) it will call server for response 3 times if error occurred.
    // refetchInterval:2000,// It means after every 2 seconds useQuery will request server to get data, at the same time it will remove the cashed data. refetchInterval's value can be false or even a callback function
  });
  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occurred:{error.message} </div>;

  return (
    <>
      <h1 className="text-center text-3xl py-5 text-red-600">Product List</h1>
      <ul className="grid grid-cols-3 gap-5">
        {products.data &&
          products.data.map((product) => (
            <li
              className="bg-green-200 p-3 rounded hover:bg-green-300 text-center"
              key={product.id}
            >
              <img
                className="w-full h-[250px] object-cover rounded"
                src={product.thumbnail}
                alt={product.title}
              />
              <h2 className="text-lg font-semibold text-center py-3">
                {product.title}
              </h2>
              <button
                className="px-3 py-1 bg-red-400 rounded "
                onClick={() => onDetails(product.id)}
              >
                Show Details
              </button>
              <button
                className="px-3 py-1 bg-red-400 rounded ml-2"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      <div className="flex justify-center gap-3 mt-6">
        {products.prev && (
          <button
            onClick={() => setPageNumber(products.prev - 1)}
            className="bg-green-600 py-1 px-3 rounded cursor-pointer"
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            onClick={() => setPageNumber(products.next + 1)}
            className="bg-green-600 py-1 px-3 rounded cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default ProductList;
