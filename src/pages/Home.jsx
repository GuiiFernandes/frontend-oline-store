import PropTypes from 'prop-types';
import React from 'react';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import '../css/Home.css';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { productList, handleAddInCart, getProducts, noSearch } = this.props;
    return (
      <main className="main">
        <CategoryList
          handleAddInCart={ handleAddInCart }
          categories={ categories }
          getProducts={ getProducts }
        />
        { productList.length ? (
          <ProductList
            productList={ productList }
            handleAddInCart={ handleAddInCart }
          />
        ) : noSearch || (
          <section className="home-container">
            <p>Nenhum produto foi encontrado</p>
          </section>
        ) }
        {
          noSearch && (
            <section className="home-container">
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </section>
          )
        }
      </main>
    );
  }
}

Home.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  handleAddInCart: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  noSearch: PropTypes.bool.isRequired,
};

export default Home;
