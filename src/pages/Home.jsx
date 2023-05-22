import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <>
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
