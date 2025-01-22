// 'use client'

// import { useEffect, useState } from 'react';
// import { client } from "@/sanity/lib/client";

// interface Product {
//   id: string;
//   name: string;
//   title: string;
//   image: string;
//   price: number;
//   discount: {
//     amount: number;
//     percentage: number;
//   };
//   stock: number;
// }

// const NewArrivals = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const query = `*[_type =="products"] | order(_createdAt desc){
//           "id": _id,
//           name,
//           "title": name,
//           "image": image.asset->url,
//           price,
//           "discount": {
//             "amount": 0,
//             "percentage": coalesce(discountPercent, 0)
//           },
//         }`;
        
//         const fetchedProducts = await client.fetch(query);
        
//         setProducts(fetchedProducts || []);
//       } catch (error) {
//         console.error('Error fetching new arrivals:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section className="py-16">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img 
//                 src={product.image} 
//                 alt={product.name}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <div className="flex justify-between items-center mt-2">
//                   <p className="text-xl font-bold">${product.price}</p>
//                   {product.discount.percentage > 0 && (
//                     <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
//                       {product.discount.percentage}% OFF
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;