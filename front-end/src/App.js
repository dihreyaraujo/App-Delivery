import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CostumerProducts from './pages/CostumerProducts';
import Home from './pages/Home';
import CostumerCheckout from './pages/CostumerCheckout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrdersDetails from './pages/CustomerOrderDetails';
import SellerOrder from './pages/SellerOrder';
import AdminManageUsers from './pages/AdminManageUsers';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CostumerProducts /> } />
        <Route path="/customer/checkout" element={ <CostumerCheckout /> } />
        <Route path="/customer/orders" element={ <CustomerOrders /> } />
        <Route path="/admin/manage" element={ <AdminManageUsers /> } />
        <Route
          path="/customer/orders/:id"
          element={ <CustomerOrdersDetails isCustomer /> }
        />
        <Route
          path="/seller/orders/:id"
          element={ <CustomerOrdersDetails isCustomer={ false } /> }
        />
        <Route
          path="/seller/orders"
          element={ <SellerOrder /> }
        />
      </Routes>
    </div>
  );
}

export default App;
