import { client } from "@/sanity/lib/client"
import { ul } from "framer-motion/client"

interface Products {
    
        discountPercent?:number,
        category?: string,
        price: number,
        sizes: string[],
        image: string,
        description:string,
        name:string
      
}

const page = async ()  => {
const querry =`*[_type=="products"]{
  discountPercent,category,price,sizes,
    "image":image.asset->url,
    description,name
}`

const products:Products[] = await client.fetch(querry)





  return (
    <div>
        {
            products.map((items,i)=> (<li key={i}>{items.name}</li>))
        }
    </div>
  )
}

export default page