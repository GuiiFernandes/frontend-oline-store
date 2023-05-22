import React from 'react';
import CategoryList from '../components/CategoryList';

class Home extends React.Component {
  render() {
    return (
      <main>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CategoryList />
      </main>
    );
  }
}

export default Home;
