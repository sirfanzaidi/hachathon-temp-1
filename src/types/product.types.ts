export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: string;
  discount?: Discount;
  category?: string;
  price: number;
  sizes: string[];
  isNew: boolean;
  image: string;
  gallery?: string[];
  description: string;
  name: string;
  title?: string;
  stock: number;
};
