import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { RootState } from '../store/store';
import { Order } from '../types';

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Package size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold">No orders yet</h2>
        <p className="text-gray-500 mt-2">Start shopping to see your orders here</p>
        <Link 
          to="/"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/order/${order.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {order.status === 'processing' && (
                    <Clock className="text-yellow-500" size={18} />
                  )}
                  {order.status === 'shipped' && (
                    <Package className="text-blue-500" size={18} />
                  )}
                  {order.status === 'delivered' && (
                    <CheckCircle className="text-green-500" size={18} />
                  )}
                  <span className="text-sm capitalize">{order.status}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">Total: ${order.total.toFixed(2)}</span>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}