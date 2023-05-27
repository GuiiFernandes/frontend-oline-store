import PropTypes from 'prop-types';
import React from 'react';
import ProductList from '../components/ProductList';
import '../css/Home.css';

class Home extends React.Component {
  render() {
    const { productList, handleAddInCart,
      noSearch, sort, handleChange, categoriesOpen } = this.props;
    const mlCat = 'ml-category';
    return (
      <>
        { productList.length ? (
          <div className={ `products-container ${categoriesOpen && mlCat}` }>
            <div className="select-container">
              <div />
              <select
                className="order"
                name="sort"
                id="sort"
                value={ sort }
                onChange={ handleChange }
              >
                <option value="">Ordenar</option>
                <option value="price_desc">
                  Maior preço
                </option>
                <option value="price_asc">
                  Menor preço
                </option>
              </select>
            </div>
            <ProductList
              productList={ productList }
              handleAddInCart={ handleAddInCart }
              sort={ sort }
            />
          </div>
        ) : noSearch || (
          <section className={ `home-container page-text ${categoriesOpen && mlCat}` }>
            <h2 className="title-message">Nenhum produto foi encontrado</h2>
            <p className="message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </section>
        ) }
        {
          noSearch && (
            <section className={ `home-container page-text ${categoriesOpen && mlCat}` }>
              <h2 className="title-message">Realize uma busca</h2>
              <p className="message" data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </section>
          )
        }
      </>
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
  noSearch: PropTypes.bool.isRequired,
  sort: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  categoriesOpen: PropTypes.bool.isRequired,
};

export default Home;
