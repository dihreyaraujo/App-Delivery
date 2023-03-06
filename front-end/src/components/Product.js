import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/products.css';

function Product(props) {
  const { product, setPrice } = props;
  const { id, name, price, urlImage } = product;
  const [quantity, setQuantity] = useState(0);
  const [priceProduct, setPriceProducts] = useState((quantity * price).toFixed(2));

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('carrinho'));
    const filterName = data.filter((elem) => elem.name !== name);
    const newValueProduct = { id, name, quantity, price: priceProduct };
    filterName.push(newValueProduct);
    localStorage.setItem('carrinho', JSON.stringify(filterName));
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('carrinho'));
    const priceTotal = data
      .map((elem) => parseFloat(elem.price)).reduce((prev, att) => prev + att);
    setPrice(priceTotal);
  }, [quantity, setPrice]);

  const altProduct = ({ target }) => {
    let quantidade = quantity;
    if (target.id === 'add-quantity') {
      setQuantity(quantity + 1);
      quantidade += 1;
    } else if (target.id === 'rm-quantity') {
      setQuantity(quantity <= 0 ? 0 : quantity - 1);
      quantidade = quantidade <= 0 ? 0 : quantidade -= 1;
    } else {
      setQuantity(target.value);
      quantidade = target.value;
    }
    setPriceProducts((price * quantidade).toFixed(2));
  };

  return (
    <div className="card-product" id={ `card-${id}` }>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        className="name-product"
      >
        {name}
      </p>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
        className="price-product"
      >
        {quantity === 0 ? price.replace(/\./, ',') : ((price * quantity).toFixed(2)).replace(/\./, ',')}
      </p>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        className="img-product"
        id={ `img-${id}` }
      />
      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ (e) => altProduct(e) }
          id="rm-quantity"
          className="button-quantity-product"
        >
          -
        </button>
        <input
          type="input"
          value={ quantity }
          data-testid={ `customer_products__input-card-quantity-${id}` }
          onChange={ (e) => altProduct(e) }
          className="input-quantity-product"
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          id="add-quantity"
          onClick={ (e) => altProduct(e) }
          className="button-quantity-product"
        >
          +
        </button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
  },
  setPrice: PropTypes.func,
};

Product.defaultProps = {
  product: {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
  },
  setPrice: PropTypes.func,
};

export default Product;
