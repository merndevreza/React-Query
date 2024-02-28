import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: "",
    rating: 5,
    thumbnail: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
  const handleAddProduct = (e) => {
    e.preventDefault();
    const addedProduct = { ...formState, id: crypto.randomUUID().toString() };
    mutation.mutate(addedProduct);
    
    setFormState({
      title: "",
      description: "",
      price: "",
      rating: 5,
      thumbnail: "",
    });
  };

  if (mutation.isLoading) {
    return <span>Submitting....</span>;
  }
  if (mutation.isError) {
    return <span>An Error Occurred:{mutation.error.message} </span>;
  }
  return (
    <div className="p-5">
      <h3>Add Product</h3>
      {mutation.isSuccess && <h3>Product Added Successfully</h3>}
      <form className="space-y-2" onSubmit={(e) => handleAddProduct(e)}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formState.title}
          onChange={handleChange}
          className="border-2 w-full border-green-500 rounded p-1"
        />
        <textarea
          name="description"
          value={formState.description}
          className="border-2 border-green-500 rounded p-1 w-full"
          placeholder="Description"
          onChange={handleChange}
          cols="30"
          rows="5"
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formState.price}
          onChange={handleChange}
          className="border-2 w-full border-green-500 rounded p-1"
        />
        <input
          type="text"
          placeholder="Thumbnail"
          name="thumbnail"
          value={formState.thumbnail}
          onChange={handleChange}
          className="border-2 w-full border-green-500 rounded p-1"
        />
        <button type="submit" className="px-3 py-1 rounded bg-green-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
