"use client";

import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
  ];

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-3 p-3">
      <Image src="/background-image.webp" fill alt="background image" style={{ objectFit: 'cover', zIndex: -1 }}/>
        <div className=" m-8 flex flex-col  border rounded-2xl p-3 h-xl w-xl text-black bg-white">
          <h1 className="border rounded p-2 text-center m-2">Products List</h1>
          <div className="flex justify-around">
            {products.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <p>Price : {product.price}</p>

                <Link
                  href={`/products/${product.id}`}
                  className="border rounded p-1 bg-pink-100"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
