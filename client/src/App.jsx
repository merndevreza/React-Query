import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [productId, setProductId] = useState(null);
  const queryClient = useQueryClient();

  const handleShowDetails = (id) => {
    setProductId(id);
  };
  const mutation=useMutation({
    mutationFn:(id)=>axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  })
  const handleDelete = (id) => {
    mutation.mutate(id)
  };
  return (
    <div className="flex gap-5">
      <div className="w-[30%]">
        <AddProduct />
      </div>
      <div className="w-[50%]">
        <ProductList onDetails={handleShowDetails} onDelete={handleDelete} />
      </div>
      <div className="w-[20%]">
        {productId && <ProductDetails id={productId} />}
      </div>
    </div>
  );
}

export default App;
