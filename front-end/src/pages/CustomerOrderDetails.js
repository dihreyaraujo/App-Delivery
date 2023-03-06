import React, { useState, useEffect } from 'react';
import { useHref } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { getById, getData } from '../services/requests';
import replaceToPrice from '../utils/replaceToPrice';
import '../style/customerOrders.css';

const lastNumWithOnlyOneChar = 9;

function CustomerOrdersDetails({ isCustomer }) {
  const [saleDate, setSaleDate] = useState('');
  const [status, setStatus] = useState('');
  const [seller, setSeller] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [products, setProducts] = useState([]);
  const href = useHref();
  const id = href.split('/')[3];

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getById('/customer/order', id);
      const sellerData = await getData(`/user/find/${data[0].seller_id}`);
      setProducts(data);
      setSaleDate(data[0].sale_date);
      setStatus(data[0].status);
      setSeller(sellerData.name);
      setTotalPrice(data[0].total_price);
    };

    fetchOrder();
  }, [id, status]);

  const updateStatus = async (endpoint, body) => {
    const apiAxios = axios.create({ baseURL: 'http://localhost:3001' });
    const ERROR_NUMBER = 501;
    const { data } = await apiAxios
      .patch(endpoint, body, { headers:
        { 'Content-Type': 'application/json' },
      validateStatus: (statusSale) => statusSale < ERROR_NUMBER });
    setStatus(data.message);
  };

  return (
    <div>
      <Navbar isCustomer={ isCustomer } />
      <div className="order-detail">
        <p>Detalhe do Pedido</p>
        <p
          data-testid={ isCustomer
            ? 'customer_order_details__element-order-details-label-order-id'
            : 'seller_order_details__element-order-details-label-order-id' }
        >
          {`PEDIDO ${id > lastNumWithOnlyOneChar ? `00${id}` : `000${id}`}`}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {isCustomer && `P. Vend: ${seller}`}
        </p>
        <p
          data-testid={ isCustomer
            ? 'customer_order_details__element-order-details-label-order-date'
            : 'seller_order_details__element-order-details-label-order-date' }
        >
          {`${new Date(saleDate).toLocaleDateString('pt-br')}`}
        </p>
        <p
          data-testid={ isCustomer
            ? 'customer_order_details__element-order-details-label-delivery-status'
            : 'seller_order_details__element-order-details-label-delivery-status' }
        >
          {status}
        </p>
      </div>
      {isCustomer ? (
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ status === 'Pendente' || status === 'Preparando'
          || status === 'Entregue' }
          onClick={ () => (
            updateStatus(`/status/sale/${id}`, { saleStatus: 'Entregue' })) }
          className="btn-status"
        >
          MARCAR COMO ENTREGUE
        </button>)
        : (
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ status !== 'Pendente' }
            onClick={ () => (
              updateStatus(`/status/sale/${id}`, { saleStatus: 'Preparando' })) }
            className="btn-status"
          >
            PREPARAR PEDIDO
          </button>
        )}
      {!isCustomer && (
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ status !== 'Preparando' }
          onClick={ () => (
            updateStatus(`/status/sale/${id}`, { saleStatus: 'Em Trânsito' })) }
          className="btn-status"
        >
          SAIU PARA ENTREGA
        </button>
      )}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 && products.map((product, index) => (
            <tr key={ product.id }>
              <td
                data-testid={ isCustomer
                  ? `customer_order_details__element-order-table-item-number-
              ${index}`
                  : `seller_order_details__element-order-table-item-number-
              ${index}` }
              >
                {index}
              </td>
              <td
                data-testid={ isCustomer
                  ? `customer_order_details__element-order-table-item-name-
              ${index}`
                  : `seller_order_details__element-order-table-item-name-
              ${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={ isCustomer
                  ? `customer_order_details__element-order-table-quantity-
              ${index}`
                  : `seller_order_details__element-order-table-quantity-
              ${index}` }
              >
                { product.quantity }
              </td>
              <td
                data-testid={ isCustomer
                  ? `customer_order_details__element-order-table-unit-price-
              ${index}`
                  : `seller_order_details__element-order-table-unit-price-
              ${index}` }
              >
                {replaceToPrice(Number(product.price))}
              </td>
              <td
                data-testid={ isCustomer
                  ? `customer_order_details__element-order-table-sub-total-
              ${index}`
                  : `seller_order_details__element-order-table-sub-total-
              ${index}` }
              >
                {replaceToPrice(Number(product.price) * Number(product.quantity))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid={ isCustomer
          ? 'customer_order_details__element-order-total-price'
          : 'seller_order_details__element-order-total-price' }
        className="total-order"
      >
        {`Total: ${replaceToPrice(totalPrice)}`}
      </p>
    </div>
  );
}

CustomerOrdersDetails.propTypes = {
  isCustomer: PropTypes.bool.isRequired,
};

export default CustomerOrdersDetails;
