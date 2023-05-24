import PropTypes from 'prop-types';
import React from 'react';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';

class Home extends React.Component {
  render() {
    const { productList, handleAddInCart } = this.props;
    return (
      <main className="main">
        <CategoryList handleAddInCart={ handleAddInCart } />
        { productList.length ? (
          <ProductList
            productList={ productList }
            handleAddInCart={ handleAddInCart }
          />
        ) : (
          <p>Nenhum produto foi encontrado</p>
        ) }
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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
};

export default Home;
