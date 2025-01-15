import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import ViewOrder from './pages/ViewOrder';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
          // In App.tsx, add this to your Routes:
          <Route path="/checkout" element={<Layout />}>
            <Route index element={<Checkout />} />
          </Route>
          <Route path="/orders" element={<Layout />}>
              <Route index element={<Orders />} />
          </Route>
          <Route path="/order/:orderId" element={<Layout />}>
              <Route index element={<OrderDetails />} /> 
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;