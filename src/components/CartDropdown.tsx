import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

export default function CartDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <div className="text-sm text-gray-600">${item.product.price}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => dispatch(updateQuantity({
                          productId: item.product.id,
                          quantity: Math.max(1, item.quantity - 1)
                        }))}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({
                          productId: item.product.id,
                          quantity: item.quantity + 1
                        }))}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
                onClick={onClose}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}