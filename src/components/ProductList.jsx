import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  render() {
    const { productList, handleAddInCart } = this.props;
    return (
      <div className="product-list-container">
        {
          productList.map((product) => (
            <div key={ product.id }>
              <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
                <ProductCard
                  key={ product.id }
                  product={ product }
                  handleAddInCart={ handleAddInCart }
                />
              </Link>
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
