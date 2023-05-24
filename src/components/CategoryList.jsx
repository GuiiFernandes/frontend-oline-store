import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from './ProductList';
import '../css/CategoryList.css';

export default class CategoryList extends Component {
  constructor() {
    super();

    this.getProducts = this.getProducts.bind(this);

    this.state = {
      categories: [],
      products: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  async getProducts(event) {
    const categoryId = event.target.id;
    const products = (await getProductsFromCategoryAndQuery(categoryId, '')).results;
    this.setState({ products });
  }

  render() {
    const { handleAddInCart } = this.props;
    const { categories, products } = this.state;
    return (
      <aside className="aside">
        <fieldset>
          { categories.map((category, index) => (
            <div key={ index }>
              <input
                onChange={ this.getProducts }
                name="category"
                type="radio"
                id={ category.id }
              />
              <label
                data-testid="category"
                htmlFor={ category.id }
              >
                { category.name }
              </label>
            </div>)) }
        </fieldset>
        <div>
          <ProductList handleAddInCart={ handleAddInCart } productList={ products } />
        </div>
      </aside>
    );
  }
}

CategoryList.propTypes = {
  handleAddInCart: PropTypes.func.isRequired,
};
