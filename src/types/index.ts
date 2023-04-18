export type ProductDetails = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

export type Product = {
  productId: number;
  quantity: number;
};

export type Cart = {
  id: number;
  userId: number;
  date: Date;
  products: Product[];
};

export type CartList = Cart[];

export type ProductsTask = {
  categoryName: string;
  productsValue: number;
}[];

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: string;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
};

export type CartWithValue = {
  cartWithValue: Product[];
  overallCartValue: number;
};
