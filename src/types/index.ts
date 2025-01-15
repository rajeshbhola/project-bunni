export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: Review[];
  stock: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
}


export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shipping: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  payment: {
    cardNumber: string;
    cardHolder: string;
  };
  subtotal: number;
  total: number;
}