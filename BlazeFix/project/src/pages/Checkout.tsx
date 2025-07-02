import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Leaf, Gift, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { state, dispatch } = useCart();
  const { updateStats } = useUser();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      updateStats(state.totalCO2Saved, state.totalEcoPoints);
      dispatch({ type: 'CLEAR_CART' });
      setOrderPlaced(true);
    }, 2000);
  };

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed! 🎉
            </h1>
            
            <p className="text-gray-600 mb-6">
              Thank you for your sustainable purchase! Your order has been confirmed and will be processed shortly.
            </p>

            {/* Environmental Impact */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-green-800">
                  Amazing Environmental Impact!
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {state.totalCO2Saved.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-green-600">CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    +{state.totalEcoPoints}
                  </div>
                  <div className="text-sm text-green-600">Eco Points Earned</div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Details</h3>
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">#GRN-{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">₹{Math.round(state.totalPrice * 1.18)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium">3-5 business days</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                View Dashboard
              </Link>
              <Link
                to="/products"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = Math.round(state.totalPrice * 1.18 + (state.totalPrice < 500 ? 50 : 0));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      defaultChecked
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="card" className="ml-2 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Credit/Debit Card
                    </label>
                  </div>
                </div>
                
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Environmental Impact */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Your Impact</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-green-700">{state.totalCO2Saved.toFixed(1)}kg</div>
                    <div className="text-green-600">CO₂ Saved</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-700">+{state.totalEcoPoints}</div>
                    <div className="text-green-600">Eco Points</div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-2 mb-6 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{state.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">
                    {state.totalPrice >= 500 ? 'Free' : '₹50'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{Math.round(state.totalPrice * 0.18)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="h-4 w-4 text-primary-600" />
                  Free shipping on orders over ₹500
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="h-4 w-4 text-primary-600" />
                  Secure payment & 30-day returns
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-primary-600 text-white py-4 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
              >
                Place Order - ₹{totalAmount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}