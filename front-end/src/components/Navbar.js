import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/navbar.css';

function Navbar({ isCustomer }) {
  const navigate = useNavigate();

  const [user, setUser] = useState('');

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    setUser(JSON.parse(getUser));
  }, []);

  return (
    <header>
      <div>
        {isCustomer ? (
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => { navigate('/customer/products'); } }
            className="button-navbar"
          >
            PRODUTOS
          </button>) : <div> </div>}
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => { navigate(`/${isCustomer ? 'customer' : 'seller'}/orders`); } }
          className="button-navbar"
        >
          {isCustomer ? 'MEUS PEDIDOS' : 'PEDIDOS'}
        </button>
      </div>
      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          className="name-nav"
        >
          {user.name}
        </p>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.setItem('user', '');
            navigate('/login');
          } }
          className="button-navbar"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  isCustomer: PropTypes.bool,
};

Navbar.defaultProps = {
  isCustomer: true,
};

export default Navbar;
