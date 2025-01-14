import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'sonner';

export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
    reviews: [],
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation',
    stock: 10
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    reviews: [],
    category: 'Electronics',
    description: 'Advanced smartwatch with health tracking features',
    stock: 15
  },
  {
    id: '3',
    name: 'Digital Camera',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
    reviews: [],
    category: 'Electronics',
    description: 'Professional digital camera with 4K video capabilities',
    stock: 5
  },
  {
    id: '4',
    name: 'Leather Backpack',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.4,
    reviews: [],
    category: 'Fashion',
    description: 'Stylish and durable leather backpack for everyday use',
    stock: 20
  },
  {
    id: '5',
    name: 'Coffee Maker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.6,
    reviews: [],
    category: 'Home',
    description: 'Premium coffee maker with programmable settings',
    stock: 8
  },
  {
    id: '6',
    name: 'Wireless Speaker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.3,
    reviews: [],
    category: 'Electronics',
    description: 'Portable wireless speaker with superior sound quality',
    stock: 12
  }
];

export default function ProductGrid() {
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Added to cart');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SAMPLE_PRODUCTS.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
          <div className="relative">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Heart className="text-gray-600 hover:text-red-500" size={20} />
            </button>
          </div>
          
          <div className="p-4">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-medium hover:text-blue-600">{product.name}</h3>
            </Link>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600">In Stock</span>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold">${product.price}</span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}