import Product from "./Product";

interface Checkout {
  items: (Product & { quantity: number })[];
  totalAmount: number;
  date: string;
}

export default Checkout;
