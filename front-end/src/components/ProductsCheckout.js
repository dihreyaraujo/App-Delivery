import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getData, postData } from '../services/requests';
import replaceToPrice from '../utils/replaceToPrice';
import '../style/productsCheckout.css';

function ProductsCheckout() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const totalPrice = products.reduce((acc, product) => Number(product.price) + acc, 0);

  const [sellers, setSellers] = useState([]);
  const [selectedSellerId, setSelectedSellerId] = useState();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const fetchSellers = async () => {
    const data = await getData('user/seller');
    setSellers(data);
    setSelectedSellerId(data[0].id);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('carrinho'));
    const filterData = data.filter((elem) => elem.quantity >= 1);
    setProducts(filterData);
    fetchSellers();
  }, []);

  useEffect(() => {}, [products]);

  const handleFinishOrder = async () => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));

    const data = await postData(
      '/customer/order',
      {
        userId: id,
        sellerId: selectedSellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        products,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    navigate(`/customer/orders/${data.id}`);
  };

  const removeItem = ({ target }) => {
    const nameItem = target.name;
    const data = JSON.parse(localStorage.getItem('carrinho'));
    const newData = data.filter((elem) => elem.name !== nameItem);
    const newItem = { name: target.name, quantity: 0, price: 0 };
    newData.push(newItem);
    localStorage.setItem('carrinho', JSON.stringify(newData));
    const filterNewData = newData.filter((elem) => elem.quantity > 0);
    setProducts(filterNewData);
  };

  return (
    <div>
      <div className="container-pedidos">
        { products.map((product, index) => (
          <div key={ index } className="container-pedido">
            <p
              data-testid={ `customer_checkout__element-
              order-table-item-number-${index}` }
            >
              { `Produto ${index + 1}` }
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              { product.name }
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              { `Quantidade: ${product.quantity}` }
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              { `Preço Únco: ${replaceToPrice((product.price / product.quantity)
                .toFixed(2))}` }
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              { `Preço Total: ${replaceToPrice(product.price)}` }
            </p>
            <button
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              name={ product.name }
              onClick={ (e) => removeItem(e) }
              className="rm-button"
            >
              Remover
            </button>
          </div>
        )) }
      </div>
      <p
        data-testid="customer_checkout__element-order-total-price"
        className="total-price-pedido"
      >
        { `Total: ${replaceToPrice(totalPrice)}` }
      </p>

      <div className="container-form-pedido">
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target }) => setSelectedSellerId(target.value) }
          value={ selectedSellerId }
          className="input-pedido"
        >
          {sellers.length > 0 && (
            sellers.map((seller) => (
              <option
                key={ seller.id }
                aria-label={ seller.id }
                value={ seller.id }
              >
                { seller.name }
              </option>
            ))
          )}
        </select>
        <input
          type="text"
          placeholder="Endereço"
          value={ deliveryAddress }
          onChange={ ({ target }) => setDeliveryAddress(target.value) }
          data-testid="customer_checkout__input-address"
          className="input-pedido"
        />
        <input
          type="text"
          placeholder="Número"
          value={ deliveryNumber }
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
          data-testid="customer_checkout__input-address-number"
          className="input-pedido"
        />
      </div>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleFinishOrder }
        className="finish-button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default ProductsCheckout;
