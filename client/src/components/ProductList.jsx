import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey}`);
  return response.data;
};

const ProductList = ({onDetails}) => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: false, // only one time it will call server if error occurred. retry:3 //(default) it will call server for response 3 times if error occurred.
    // refetchInterval:2000,// It means after every 2 seconds useQuery will request server to get data, at the same time it will remove the cashed data. refetchInterval's value can be false or even a callback function
  });
  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occurred:{error.message} </div>;

  return (
    
    < >
    <h1 className="text-center text-3xl py-5 text-red-600">Product List</h1>
    <ul className="grid grid-cols-3 gap-5">
      {products &&
        products.map((product) => (
          <li className="bg-green-200 p-3 rounded hover:bg-green-300 cursor-pointer" key={product.id} onClick={()=>onDetails(product.id)}>
            <img
              className="w-full h-[250px] object-cover rounded"
              src={product.thumbnail}
              alt={product.title}
            />
            <h2 className="text-lg font-semibold text-center py-3">
              {product.title}
            </h2>
          </li>
        ))}
    </ul>
  </>
  );
};

export default ProductList;
