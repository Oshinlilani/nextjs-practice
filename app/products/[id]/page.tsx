import { defaultConfig } from "next/dist/server/config-shared";
import { Geist } from "next/font/google";

type Props = {
  params : Promise< {id: string} >;
}

const geist = Geist({
  subsets : ['latin']
})

export default async function ProductDetails({params} : Props) {
  const { id } = await params;

  const products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Headphones', price: 3000 },
  ];


  const product : any = products.find((item) => item.id === Number(id));

  if(!product) (
    <h2>Products not found</h2>
  )

  return (
    <div className="flex justify-center items-center flex-col gap-2 m-6">
      <h2 className="">{product.name}</h2>
      <p>{product.price}</p>
    </div>
  )


}