import Product from "./Product";

type CartItem = Product & { quantity: number };

export default CartItem;
