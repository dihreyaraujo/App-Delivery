import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Product from '../components/Product';
import { getData } from '../services/requests';
import '../style/customerProducts.css';

function CostumerProducts() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // componentDidMount
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getData('/products');
      setProducts(data);
      const arrayRequests = data.map((elem) => ({
        name: elem.name,
        quantity: 0,
        price: elem.price,
      }));
      localStorage.setItem('carrinho', JSON.stringify(arrayRequests));
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-products">
        {products.length > 0 && products
          .map((product) => (
            <Product
              key={ product.id }
              product={ product }
              setPrice={ setTotalPrice }
            />
          ))}
      </div>
      <Link
        to="/customer/checkout"
        data-testid="customer_products__checkout-bottom-value"
        className="container-total"
      >
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ parseInt(totalPrice, 10) === 0 }
          className="button-total"
        >
          { totalPrice.toFixed(2).replace(/\./, ',') }
        </button>
      </Link>
    </div>
  );
}

export default CostumerProducts;
