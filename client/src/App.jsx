import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  const [productId,setProductId]=useState(null)

  const handleShowDetails=(id)=>{
    setProductId(id)
  }
  return (
    <div className="flex gap-5">
      <div className="w-[30%]">
        <AddProduct/>
      </div>
      <div className="w-[50%]">
        <ProductList onDetails={handleShowDetails} />
      </div>
      <div className="w-[20%]">
        {productId && <ProductDetails id={productId} />}
      </div>
    </div>
  );
}

export default App;
