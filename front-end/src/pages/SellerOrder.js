import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DEZ = 10;

function SellerOrder() {
  const [sales, setSales] = useState([]);

  const getFunc = async (endpoint) => {
    const apiAxios = axios.create({ baseURL: 'http://localhost:3001' });
    const ERROR_NUMBER = 501;
    const { data } = await apiAxios
      .get(endpoint, { headers:
        { 'Content-Type': 'application/json' },
      validateStatus: (status) => status < ERROR_NUMBER });
    return data;
  };

  useEffect(() => {
    const allOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const data = await getFunc(`/orders/seller/${user.id}`);
        if (!data.message) {
          setSales(data);
        } else {
          setSales(data.message);
        }
      } catch (e) {
        console.log(e);
      }
    };
    allOrders();
  }, []);

  return (
    <div>
      <Navbar isCustomer={ false } />
      <div className="container-orders">
        { sales.map((elem, index) => (
          <Link
            to={ `/seller/orders/${elem.id}` }
            key={ index }
            className="customer-orders"
          >
            <div>
              <p
                data-testid={ `seller_orders__element-order-id-${elem.id}` }
              >
                { elem.id < DEZ ? `Pedido 000${elem.id}` : `Pedido 00${elem.id}`}
              </p>
              <p
                data-testid={ `seller_orders__element-delivery-status-${elem.id}` }
              >
                { elem.status }
              </p>
              <p
                data-testid={ `seller_orders__element-order-date-${elem.id}` }
              >
                { new Date(elem.saleDate).toLocaleDateString('pt-br') }
              </p>
              <p
                data-testid={ `seller_orders__element-card-price-${elem.id}` }
              >
                { `R$${elem.totalPrice.replace(/\./, ',')}` }
              </p>
              <p data-testid={ `seller_orders__element-card-address-${elem.id}` }>
                { `${elem.deliveryAddress}, ${elem.deliveryNumber}` }
              </p>
            </div>
          </Link>
        )) }
      </div>
    </div>
  );
}

export default SellerOrder;
