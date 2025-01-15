import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { RootState } from '../store/store';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';
import { toast } from 'sonner';

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCartButton, setShowCartButton] = useState(false);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const moveToCart = (item: Product) => {
    const product: Product = {
      ...item,
      rating: item.rating || 0,
      reviews: item.reviews || [],
      stock: item.stock || 0
    };
    
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product.id));
    toast.success('Moved to cart');
    setShowCartButton(true);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Heart size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-2">Start saving your favorite items</p>
        {showCartButton && (
          <button 
            onClick={handleGoToCart}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Go to Cart
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist ({wishlistItems.length})</h1>
      {showCartButton && (
          <button 
            onClick={() => navigate('/cart')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Go to Cart
          </button>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="relative aspect-square mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-lg font-bold mt-2">${item.price}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => moveToCart(item)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Move to Cart
              </button>
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}