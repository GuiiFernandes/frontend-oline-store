import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div className="product-list-container">
        {
          productList.map((product) => (
            <div key={ product.id }>
              <Link to={ `/product/${product.id}` }>
                <ProductCard
                  product={ product }
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
};
