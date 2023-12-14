"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const page = ({ params }) => {
  const IsAdmin = useSelector((state) => state.auth.user.admin);
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const slug = params.slug.replace(/-/g, " ");
  const getProduct = async () => {
    const response = await axios.get(`/api/product/${slug}`);
    console.log(response.data.product);
    setProduct(response.data.product);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/product/delete/${slug}`);

      console.log(response.data.message);
      router.push("/dashboard/admin/products");
    } catch (error) {
      console.log(error, "error while deleting product");
    }
  };
  console.log(IsAdmin);
  return (
    <div>
      {IsAdmin ? (
        <div className="pt-36 md:grid md:grid-cols-6 flex flex-col gap-3 px-20 justify-center items-left">
          <img
            className="w-[50vw]"
            src={product.thumbnail}
            alt={product.title}
          />
          <div className="sm:p-1 md:p-5">
            <p className="text-red-900 font-semibold">Title</p>
            <h3 className="font-bold">{product.title}</h3>
          </div>
          <div className="sm:p-1 md:p-5">
            <p className="text-red-900 font-semibold">Description</p>
            <h3 className="font-bold">{product.description}</h3>
          </div>
          <div className="sm:p-1 md:p-5">
            <p className="text-red-900 font-semibold">Category</p>
            <h3 className="font-bold">{product.category}</h3>
          </div>
          <div className="sm:p-1 md:p-5">
            <p className="text-red-900 font-semibold">Price</p>
            <h3 className="font-bold">{product.price}</h3>
          </div>
          <div className="sm:p-1 md:p-5">
            <button className="px-4 py-2 bg-green-400" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <h1>If you are admin Please Login</h1>
      )}
    </div>
  );
};

export default page;
