import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  render() {
    const { productList, handleAddInCart } = this.props;
    return (
      <div className="product-list-container">
        {
          productList.map((product) => (
            <div key={ product.id }>
              <div data-testid="product">
                <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
                  <img src={ product.thumbnail } alt={ product.title } />
                  <h4>{ product.title }</h4>
                  <p>{ product.price }</p>
                  { product.shipping.free_shipping
                  && <p data-testid="free-shipping">Frete grátis</p>}
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => handleAddInCart(product) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
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
};

ProductList.defaultProps = {
  handleAddInCart: () => {},
};
