import { Product } from "@/types/product.types";
import { client } from "@/sanity/lib/client";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header/page";
import Tabs from "@/components/product-page/Tabs/page";
import ProductListSec from "@/components/common/ProductListSec";

async function getProduct(id: string) {
  try {
    const query = `*[_type == "products" && _id == $id][0]{
      "id": _id,
      name,
      "title": name,
      "image": image.asset->url,
      "gallery": coalesce(gallery[].asset->url, [image.asset->url]),
      price,
      description,
      category,
      "discount": {
        "amount": 0,
        "percentage": coalesce(discountPercent, 0)
      },
      sizes,
      colors
    }`;

    const product = await client.fetch(query, { id });
    console.log('Fetched product:', product); // Debug log
    
    if (!product) return null;

    // Ensure gallery is an array and contains at least the main image
    const gallery = Array.isArray(product.gallery) ? product.gallery : [product.image];
    if (!gallery.includes(product.image)) {
      gallery.unshift(product.image);
    }

    return {
      ...product,
      gallery,
      stock: product.stock || 50,
      colors: product.colors || [],
      sizes: product.sizes || [],
      description: product.description || '',
      discount: {
        amount: 0,
        percentage: product.discount?.percentage || 0
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category: string, currentProductId: string) {
  try {
    const query = `*[_type == "products" && category == $category && _id != $currentProductId][0...4]{
      "id": _id,
      name,
      "title": name,
      "image": image.asset->url,
      price,
      description,
      "discount": {
        "amount": 0,
        "percentage": coalesce(discountPercent, 0)
      }
    }`;

    const products = await client.fetch(query, { category, currentProductId });
    if (!Array.isArray(products)) return [];

    return products.map(product => ({
      ...product,
      stock: product.stock || 50,
      colors: product.colors || [],
      sizes: product.sizes || [],
      description: product.description || '',
      discount: {
        amount: 0,
        percentage: product.discount?.percentage || 0
      }
    }));
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productId = params.slug[0];
  const product = await getProduct(productId);

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  // Get related products based on the same category
  const relatedProducts = await getRelatedProducts(product.category, productId);

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={product.name} />
        <section className="mb-11">
          <Header data={product} />
        </section>
        <Tabs />
        {relatedProducts.length > 0 && (
          <div className="mb-[50px] sm:mb-20">
            <ProductListSec 
              title="You might also like" 
              data={relatedProducts}
              viewAllLink={`/shop?category=${product.category}`}
            />
          </div>
        )}
      </div>
    </main>
  );
}
