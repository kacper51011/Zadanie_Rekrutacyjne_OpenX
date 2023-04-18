import { useEffect, useState } from "react";
import { Cart, CartWithValue, Product, ProductDetails, User } from "../types";
import axios, { AxiosResponse } from "axios";

// I decided to just write working code, obviously there is a possibility to make it look a lot better and more readable
//

export const Carts = () => {
  const [highestValue, setHighestValue] = useState(0);
  const [userForTask, setUserForTask] = useState<User["name"]>();

  const loadUsers = async () => {
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        "https://fakestoreapi.com/users"
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const loadCarts = async () => {
    try {
      const response: AxiosResponse<Cart[]> = await axios.get(
        "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
      );

      return response.data;
    } catch (err) {}
  };

  const findCartWithHighestValue = async () => {
    // responses
    const products = (await loadProducts()) as ProductDetails[];
    const users = (await loadUsers()) as User[];
    const carts = (await loadCarts()) as Cart[];

    let cartWithHighestValue: CartWithValue;
    let cartWithHighestValueUserId: number;
    // each cart
    carts.forEach((cart) => {
      let cartWithValue: Product[] = [];
      let overallCartValue: number = 0;
      // each product
      cart.products.forEach((productInCart) => {
        let productValue;

        const foundProduct = products.find(
          (toFind) => toFind.id === productInCart.productId
        );
        productValue = parseFloat(foundProduct!.price) * productInCart.quantity;
        overallCartValue += productValue;

        return cartWithValue.push(productInCart);
      });
      // each cart
      if (
        !cartWithHighestValue ||
        cartWithHighestValue.overallCartValue < overallCartValue
      ) {
        cartWithHighestValueUserId = cart.userId;
        setHighestValue(overallCartValue);
      }
    });

    // found user

    const userWithHighestValueCart = users.find(
      (user) => user.id === cartWithHighestValueUserId
    );

    setUserForTask(userWithHighestValueCart!.name);
  };

  useEffect(() => {
    findCartWithHighestValue();
  }, []);

  return (
    <>
      <h3>Carts task:</h3>
      <div>Value of cart: {highestValue}</div>
      <div>Owner: {userForTask?.firstname + " " + userForTask?.lastname} </div>
    </>
  );
};
