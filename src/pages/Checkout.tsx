import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';
import { ChevronRight, CreditCard, Truck, Check } from 'lucide-react';
import { toast } from 'sonner';
import { addOrder } from '../store/slices/orderSlice'; // Add this import


type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

interface ShippingForm {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface PaymentForm {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export default function Checkout() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingForm>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentForm>({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const handleConfirmOrder = () => {
    // Here you would typically make an API call to process the order
    const order = {
      id: `ORD${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      status: 'processing' as const,
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      shipping: shippingDetails,
      payment: {
        cardNumber: paymentDetails.cardNumber.slice(-4),
        cardHolder: paymentDetails.cardHolder
      },
      subtotal: total,
      total: total
    };
    dispatch(addOrder(order));
    dispatch(clearCart());
    toast.success('Order placed successfully!');
    navigate('/orders');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className={`flex items-center ${step === 'shipping' ? 'text-blue-600' : 'text-gray-600'}`}>
        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
          <Truck size={16} />
        </div>
        <span className="ml-2">Shipping</span>
      </div>
      <ChevronRight className="mx-4 text-gray-400" size={20} />
      <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-600'}`}>
        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
          <CreditCard size={16} />
        </div>
        <span className="ml-2">Payment</span>
      </div>
      <ChevronRight className="mx-4 text-gray-400" size={20} />
      <div className={`flex items-center ${step === 'confirmation' ? 'text-blue-600' : 'text-gray-600'}`}>
        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
          <Check size={16} />
        </div>
        <span className="ml-2">Confirmation</span>
      </div>
    </div>
  );

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            required
            value={shippingDetails.fullName}
            onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            required
            value={shippingDetails.phone}
            onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            required
            value={shippingDetails.address}
            onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            required
            value={shippingDetails.city}
            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            required
            value={shippingDetails.state}
            onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PIN Code</label>
          <input
            type="text"
            required
            value={shippingDetails.pincode}
            onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Continue to Payment
      </button>
    </form>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            required
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
          <input
            type="text"
            required
            value={paymentDetails.cardHolder}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              required
              placeholder="MM/YY"
              value={paymentDetails.expiry}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="text"
              required
              maxLength={3}
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Confirm Payment
      </button>
    </form>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <span>{item.product.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleConfirmOrder}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {renderStepIndicator()}
      
      <div className="bg-white rounded-lg shadow p-6">
        {step === 'shipping' && renderShippingForm()}
        {step === 'payment' && renderPaymentForm()}
        {step === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
}