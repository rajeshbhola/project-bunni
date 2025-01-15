import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Truck, CheckCircle, ChevronRight } from 'lucide-react';
import { RootState } from '../store/store';

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = useSelector((state: RootState) => 
    state.orders.orders.find(o => o.id === orderId)
  );

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Package size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold">Order not found</h2>
        <Link 
          to="/orders"
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        <p className="text-gray-600">
          Placed on {new Date(order.date).toLocaleDateString()}
        </p>
      </div>

      {/* Order Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-6">Order Status</h2>
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${
            order.status === 'processing' ? 'text-blue-600' : 'text-gray-400'
          }`}>
            <Package size={24} className="mb-2" />
            <span>Processing</span>
          </div>
          <ChevronRight className="text-gray-400 self-center" />
          <div className={`flex flex-col items-center ${
            order.status === 'shipped' ? 'text-blue-600' : 'text-gray-400'
          }`}>
            <Truck size={24} className="mb-2" />
            <span>Shipped</span>
          </div>
          <ChevronRight className="text-gray-400 self-center" />
          <div className={`flex flex-col items-center ${
            order.status === 'delivered' ? 'text-blue-600' : 'text-gray-400'
          }`}>
            <CheckCircle size={24} className="mb-2" />
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
            <div className="text-gray-600 space-y-1">
              <p>{order.shipping.fullName}</p>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state} {order.shipping.pincode}</p>
              <p>Phone: {order.shipping.phone}</p>
            </div>
          </div>

          <Link 
            to="/orders"
            className="block w-full text-center bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}