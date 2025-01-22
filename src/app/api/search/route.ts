import { NextResponse } from 'next/server';
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const brands = searchParams.getAll('brands[]');
  const categories = searchParams.getAll('categories[]');
  const rating = searchParams.get('rating');
  const sortBy = searchParams.get('sortBy') || 'createdAt';

  try {
    // Build filter conditions
    let filters = [];
    
    if (query) {
      filters.push(`(lower(name) match "*${query}*" || 
        lower(description) match "*${query}*" || 
        count((categories[]->name)[@ match "*${query}*"]) > 0)`);
    }

    if (minPrice) filters.push(`price >= ${minPrice}`);
    if (maxPrice) filters.push(`price <= ${maxPrice}`);
    if (brands.length) filters.push(`brand->name in [${brands.map(b => `"${b}"`).join(',')}]`);
    if (categories.length) filters.push(`count((categories[]->name)[@ in [${categories.map(c => `"${c}"`).join(',')}]]) > 0`);
    if (rating) filters.push(`rating >= ${rating}`);

    const filterString = filters.length ? `&& ${filters.join(' && ')}` : '';
    
    // Build sort condition
    const sortString = sortBy === 'price_asc' ? 'price asc' :
                      sortBy === 'price_desc' ? 'price desc' :
                      sortBy === 'rating' ? 'rating desc' :
                      '_createdAt desc';

    const searchQuery = `*[_type =="products" ${filterString}] | order(${sortString}){
      "id": _id,
      name,
      "title": name,
      "image": image.asset->url,
      price,
      "brand": brand->name,
      "categories": categories[]->name,
      rating,
      "discount": {
        "amount": 0,
        "percentage": coalesce(discountPercent, 0)
      },
      "stock": 50
    }`;

    const products = await client.fetch(searchQuery);

    // Fetch aggregations for faceted search
    const aggregations = await client.fetch(`{
      "brands": *[_type == "brand"] { name },
      "categories": *[_type == "category"] { name },
      "priceRange": {
        "min": min(*[_type == "products"].price),
        "max": max(*[_type == "products"].price)
      }
    }`);

    return NextResponse.json({ 
      products: products || [], 
      facets: aggregations 
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ products: [], facets: {} });
  }
} 