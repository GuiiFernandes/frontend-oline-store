import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/CategoryList.css';

export default class CategoryList extends Component {
  render() {
    const { getProducts, categories } = this.props;
    return (
      <aside>
        <fieldset>
          { categories.map((category, index) => (
            <div key={ index } className="aside">
              <input
                onChange={ getProducts }
                name="category"
                type="radio"
                id={ category.id }
                className="txtCategory"
              />
              <label
                data-testid="category"
                className="lblCategory"
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

CategoryList.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  getProducts: PropTypes.func.isRequired,
};
