import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands/page";
import DressStyle from "@/components/homepage/DressStyle/page";
import Header from "@/components/homepage/Header/page";
import Reviews from "@/components/homepage/Reviews/page";
import { client } from "@/sanity/lib/client";
import { reviewsData } from '@/data/reviews'; // Correct import path

async function getNewArrivals() {
  try {
    console.log('Fetching new arrivals...');
    const query = `*[_type =="products"] {
     _id,discountPercent,category,price,sizes,
    "image":image.asset->url,
    name 
    }`;
    
    const products = await client.fetch(query);
    console.log('New Arrivals Products:', products);
    
    if (!products || !Array.isArray(products)) {
      console.error('Invalid products data:', products);
      return [];
    }
    
    // Transform the data to match our Product type
    return products.map(product => ({
      ...product,
      id: product._id,
      description: ''
    }));
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
}

async function getTopSelling() {
  try {
    console.log('Fetching top selling...');
    const query = `*[_type=="products"] {
     _id,discountPercent,category,price,sizes,
    "image":image.asset->url,
    name
    } [10...14]`;
    
    const products = await client.fetch(query);
    console.log('Top Selling Product:', products);
    
    if (!products || !Array.isArray(products)) {
      console.error('Invalid products data:', products);
      return [];
    }
    
    // Transform the data to match our Product type
    return products.map(product => ({
      ...product,
      id: product._id,
      description: ''
    }));
  } catch (error) {
    console.error('Error fetching top selling:', error);
    return [];
  }
}

export default async function Home() {
  const newArrivals = await getNewArrivals();
  const topSelling = await getTopSelling();

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <Header />
        <Brands />
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec title="New Arrivals" data={newArrivals} viewAllLink="/shop" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec title="Top Selling" data={topSelling} viewAllLink="/shop" />
        </div>
        <DressStyle />
        <Reviews reviewsData={reviewsData} />
      </div>
    </main>
  );
}
