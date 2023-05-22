import React from 'react';
import CategoryList from '../components/CategoryList';

class Home extends React.Component {
  render() {
    return (
      <>
        <CategoryList />
        <label>
          <input />
          <button>
            Buscar
          </button>
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

export default Home;
