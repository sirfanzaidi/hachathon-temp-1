import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";

const Header = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
            ])}
          >
            {data.name}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
            <p className="text-xl sm:text-2xl font-semibold">
            ${data.price - (data.price * (data.discount?.percentage || 0)) / 100}
            </p>
            {(data.discount?.percentage || 0) > 0 && (
              <p className="text-neutral-400 line-through text-lg sm:text-xl ml-2">
                ${data.price}
              </p>
            )}
          </div>
          <p className="text-sm sm:text-base text-black/60 mb-5">
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>

          {/* Stock Information */}
          <div className="mb-5">
            <p className="text-sm sm:text-base text-black/60">
              <strong>Stock: </strong>
              {data.stock > 0 ? (
                <span className="text-green-500">In Stock ({data.stock} available)</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>
          </div>

          <hr className="h-[1px] border-t-black/10 mb-5" />
          <ColorSelection />
          <hr className="h-[1px] border-t-black/10 my-5" />
          <SizeSelection />
          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
};

export default Header;
