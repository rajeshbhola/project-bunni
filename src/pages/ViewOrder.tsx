import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ChevronRight, Truck, BookCheck } from 'lucide-react';

// Mock order data - in a real app, this would come from an API
const MOCK_ORDER = {
  id: 'ORD123456',
  date: '2024-02-28',
  status: 'delivered',
  items: [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9'
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9'
    }
  ],
  shipping: {
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
    phone: '123-456-7890'
  },
  payment: {
    method: 'Credit Card',
    last4: '4242'
  },
  subtotal: 799.97,
  shipping_cost: 10.00,
  total: 809.97
};

type OrderStatus = 'processing' | 'shipped' | 'delivered';

const ORDER_STAGES: OrderStatus[] = ['processing', 'shipped', 'delivered'];

export default function ViewOrder() {
  const { orderId } = useParams();
  const order = MOCK_ORDER; // In real app, fetch order details using orderId

  const orderStatus: OrderStatus = 'delivered';

  const renderOrderStatus = () => {
    const currentStageIndex = ORDER_STAGES.indexOf(orderStatus);

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Status</h2>
        <div className="flex items-center justify-between">
          {ORDER_STAGES.map((stage, index) => (
            <React.Fragment key={stage}>
              <div className={`flex flex-col items-center ${index <= currentStageIndex ? 'text-blue-600' : 'text-gray-400'}`}>
                {stage === 'processing' && <Package className="mb-2" size={24} />}
                {stage === 'shipped' && <Truck className="mb-2" size={24} />}
                {stage === 'delivered' && <BookCheck className="mb-2" size={24} />}
                <span className="text-sm capitalize">{stage}</span>
              </div>
              {index < ORDER_STAGES.length - 1 && (
                <ChevronRight className={`${index < currentStageIndex ? 'text-blue-600' : 'text-gray-400'}`} size={20} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
      </div>

      {renderOrderStatus()}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="md:col-span-2 space-y-6">
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
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="text-gray-600">
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state} {order.shipping.pincode}</p>
              <p>Phone: {order.shipping.phone}</p>
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
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${order.shipping_cost.toFixed(2)}</span>
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
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="text-gray-600">
              <p>{order.payment.method}</p>
              <p>**** **** **** {order.payment.last4}</p>
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