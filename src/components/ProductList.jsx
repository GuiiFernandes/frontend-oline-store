import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../css/ProductList.css';

export default class ProductList extends Component {
  render() {
    const { productList, handleAddInCart, sort } = this.props;

    if (sort === 'price_asc') productList.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') {
      productList.sort((a, b) => a.price - b.price).reverse();
    }

    return (
      <div className="product-list-container">
        {
          productList.map((product) => (
            <div key={ product.id } className="productBox" data-testid="product">
              <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
                <img
                  className="imgProduct"
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                { product.shipping.free_shipping && (
                  <p
                    className="freteGratis"
                    data-testid="free-shipping"
                  >
                    Frete grátis
                  </p>
                ) }
                <h4 className="nameProduct">{ product.title }</h4>
                <p className="priceProduct">
                  R$
                  { product.price }
                </p>
              </Link>
              <button
                className="btnAddCart"
                data-testid="product-add-to-cart"
                onClick={ () => handleAddInCart(product) }
              >
                Adicionar ao carrinho
                <FaShoppingCart size="20px" />
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  handleAddInCart: PropTypes.func,
  sort: PropTypes.string.isRequired,
};

ProductList.defaultProps = {
  handleAddInCart: () => {},
};
