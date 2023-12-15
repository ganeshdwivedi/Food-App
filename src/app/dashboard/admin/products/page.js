"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

const page = () => {
  const IsAdmin = useSelector((state) => state.auth.isAdmin);
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const response = await axios.get("/api/product/all");
    setProduct(response.data.products);
  };
  console.log(product);
  useEffect(() => {
    getProduct();
  }, []);

  const GetAllProducts = product.map((item) => {
    let slug = item.title.replace(/ /g, "-");
    console.log(slug);
    return (
      <Link key={item._id} href={`/dashboard/admin/products/${slug}`}>
        <div
          key={item._id}
          className="md:w-[25vw] text-center sm:w-[49vw] h-[full] md:my-8 sm:my-2 rounded-[25px] md:p-4 sm:p-2 overflow-hidden"
        >
          <img
            className=" hover:scale-[1.03] hover:transition-all hover:delay-[120ms] md:w-full md:h-[40vh] sm:h-[25vh] sm:w-full "
            src={item.thumbnail}
          />

          <div className="mt-2">
            <p className="font-medium text-3xl text-slate-800">{item.title}</p>
            <h4 className="font-bold text-2xl text-red-800">₹ {item.price}</h4>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="pt-32 overflow-hidden">
      {IsAdmin ? (
        <div>
          <h1 className="text-center text-3xl m-10">
            Here are all the products added by admin
          </h1>
          <Link
            href={"/dashboard/admin/addProduct"}
            className="px-4 text-center m-5 py-2 rounded-[25px] bg-red-700 text-white"
          >
            Add Product
          </Link>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-0 md:gap-x-10">
            {GetAllProducts}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-3xl">You can't access this page</h1>
      )}
    </div>
  );
};

export default page;
