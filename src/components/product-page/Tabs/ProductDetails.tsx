import React from "react";

export type SpecItem = {
  label: string;
  value: string;
};

const specsData: SpecItem[] = [
  {
    label: "Material composition",
    value: "100% Cotton",
  },
  {
    label: "Care instructions",
    value: "Machine wash warm, tumble dry",
  },
  {
    label: "Fit type",
    value: "Classic Fit",
  },
  {
    label: "Pattern",
    value: "Solid",
  },
  // Optionally, you can add the stock here
  // {
  //   label: "Stock",
  //   value: "10 available", // or use a dynamic value passed from the parent
  // },
];

type ProductDetailsProps = {
  stock: number;
};

const ProductDetails = ({ stock }: ProductDetailsProps) => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}

      {/* Add stock information */}
      <div className="grid grid-cols-3">
        <div>
          <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
            Stock
          </p>
        </div>
        <div className="col-span-2 py-3 lg:py-4 border-b">
          <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
            {stock > 0 ? `${stock} available` : "Out of stock"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
