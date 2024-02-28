import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};
const ProductDetails = ({ id }) => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchProduct,
  });
  isLoading && <div>Fetching Data...</div>;
  error && <div>An Error Occurred: {error.message}</div>;
  return (
    <div className="p-4 bg-red-300 mt-[75px] rounded text-center">
 
      {product ? (
        <>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>{product.description}</p>
        </>
      ):<p>No Product chosen</p>}
    </div>
  );
};

export default ProductDetails;
