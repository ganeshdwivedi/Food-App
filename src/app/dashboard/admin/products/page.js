"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

const page = () => {
  const IsAdmin = useSelector((state) => state.auth.user.isAdmin);
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const response = await axios.get("/api/product/all");
    setProduct(response.data.products);
  };
  console.log(product);
  useEffect(() => {
    getProduct();
  }, []);

  const GetAllProducts = product.map((item, index) => {
    let slug = item.title.replace(/ /g, "-");
    console.log(slug);
    return (
      <Link key={item._id} href={`/dashboard/admin/products/${slug}`}>
        <div
          key={item._id}
          className="md:w-[25vw] text-center sm:w-[49vw] h-[full] md:my-8 sm:my-2 rounded-[25px] md:p-4 sm:p-2 overflow-hidden"
        >
          <Link href={`/menu/${slug}`}>
            <img
              className=" hover:scale-[1.03] hover:transition-all hover:delay-[120ms] md:w-full md:h-[40vh] sm:h-[25vh] sm:w-full "
              src={item.thumbnail}
            />
          </Link>
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
      <h1 className="text-center text-3xl">
        Here are all the products added by admin
      </h1>
      <Link
        href={"/dashboard/admin/addProduct"}
        className="px-4 py-2 rounded-[25px] bg-red-700 text-white"
      >
        Add Product
      </Link>
      <div className="grid md:grid-cols-2 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-0 md:gap-x-10">
        {GetAllProducts}
      </div>
    </div>
  );
};

export default page;
