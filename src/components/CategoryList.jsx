import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <aside>
        <fieldset>
          { categories.map((category, index) => (
            <div key={ index }>
              <input name="category" type="radio" id={ category.id } />
              <label
                data-testid="category"
                htmlFor={ category.id }
              >
                { category.name }
              </label>
            </div>)) }
        </fieldset>
      </aside>
    );
  }
}
