import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto group transition-transform transform hover:scale-102 duration-300"
    >
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={data.image}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          alt={data.name}
          priority
        />
      </div>
      <strong className="text-sm sm:text-base font-bold font-sora line-clamp-1">
        {data.name}
      </strong>
      {data.description && (
        <p className="text-sm text-gray-600 mb-1 xl:mb-2 line-clamp-2">
          {data.description}
        </p>
      )}
      <div className="flex items-end mb-1 xl:mb-2">
        <p className="text-lg sm:text-xl font-bold font-sora">
          ${data.price - (data.price * (data.discount?.percentage ?? 0)) / 100}
        </p>
        {data.discount?.percentage && data.discount.percentage > 0 && (
          <p className="text-neutral-400 line-through text-sm ml-2">
            ${data.price}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
        {data.discount?.percentage && data.discount.percentage > 0 && (
          <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333] group-hover:bg-[#FF3333] group-hover:text-white transition-all duration-300">
            {`-${data.discount.percentage}%`}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;