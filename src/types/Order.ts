export default interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  date: string;
}
