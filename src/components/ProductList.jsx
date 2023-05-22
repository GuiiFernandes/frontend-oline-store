import PropTypes from 'prop-types';
import { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  render() {
    const { query } = this.props;

    return (
      <div>
        {
          query.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
            />
          ))
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  query: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};
