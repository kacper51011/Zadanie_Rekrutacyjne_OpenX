import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ProductDetails, ProductsTask } from "../types";

export const Products = () => {
  const [products, setProducts] = useState<ProductsTask>([]);

  // I won`t do any kind of error handling but I would, it`s not a problem
  // I know the code may look a bit messy, but I tried to just do the task

  useEffect(() => {
    const abortController = new AbortController();
    const loadProducts = async () => {
      try {
        const response: AxiosResponse<ProductDetails[]> = await axios.get(
          "https://fakestoreapi.com/products",
          { signal: abortController.signal }
        );

        const categories = new Set(
          response.data.map((product) => product.category)
        );

        categories.forEach((category) => {
          let sum = 0;

          const categoryProducts = response.data.filter(
            (item) => item.category === category
          );

          categoryProducts.forEach((product) => {
            sum += Number(product.price);
          });

          return setProducts((oldProducts) => [
            ...oldProducts,
            {
              categoryName: category,
              productsValue: sum,
            },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadProducts();

    return () => abortController.abort();
  }, []);

  return (
    <>
      <h3>Products Task</h3>
      <ul>
        {products.map((product, index) => {
          return (
            <li key={index}>
              {product.categoryName}: {product.productsValue.toFixed(2)}
            </li>
          );
        })}
      </ul>
    </>
  );
};
