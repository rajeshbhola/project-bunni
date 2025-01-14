import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'sonner';
import { SAMPLE_PRODUCTS } from '../components/ProductGrid';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = SAMPLE_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success('Added to cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          <button className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-md hover:bg-gray-50">
            <Heart className="text-gray-600 hover:text-red-500" size={24} />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-current" size={20} />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-blue-600 hover:underline cursor-pointer">
                {product.reviews.length} reviews
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price}</div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-md border hover:bg-gray-50"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 rounded-md border hover:bg-gray-50"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div>Category: {product.category}</div>
              <div>Stock: {product.stock} units</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}