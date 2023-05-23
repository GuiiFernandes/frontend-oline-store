import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from './ProductList';

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
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ products: products.results });
  }

  render() {
    const { categories, products } = this.state;
    return (
      <aside>
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
          <ProductList productList={ products } />
        </div>
      </aside>
    );
  }
}
