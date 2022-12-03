export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface User {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
}
interface Address {
  geolocation: {
    lat: string,
    long: string
    },
    city: string,
    street: string,
    number: number,
    zipcode: string
}
interface Name {
  firstname: string;
  lastname: string;
}
// interface ProductShortDescription {
//   id: number;
//   img: string;
//   name: string;
//   quantity: number;
// }
// export interface UserProducts {
//   products: Array<ProductShortDescription>;
// }
