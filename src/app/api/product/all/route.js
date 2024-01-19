import connect from "../../../../config/dbconfig";
import Product from "../../../../model/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect();
  try {
    const products = await Product.find({});
   const response = NextResponse.json({ products: products });
    response.headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    };
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
