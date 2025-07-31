import Product from "@/types/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

export const useProducts = (options?: { initialData?: Product[] }) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    initialData: options?.initialData,
  });

  return {
    products,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
};
