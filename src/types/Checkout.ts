import Cart from "./Cart";

interface Checkout {
  items: Cart[];
  totalAmount: number;
  date: string;
}

export default Checkout;
