import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/CategoryList.css';

export default class CategoryList extends Component {
  render() {
    const { getProducts, categories } = this.props;
    return (
      <aside className="aside">
        { categories.map((category, index) => (
          <button
            key={ index }
            id={ category.id }
            onClick={ getProducts }
            data-testid="category"
            className="category"
            name="category"
          >
            { category.name }
          </button>)) }
      </aside>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  getProducts: PropTypes.func.isRequired,
};
