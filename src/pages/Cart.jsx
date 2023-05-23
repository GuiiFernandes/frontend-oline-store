import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  state = {
    productsInCart: [],
  };

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    });
  }

  render() {
    const { productsInCart } = this.state;
    return (
      <main>
        <nav>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </nav>
        <section>
          { productsInCart.length
            ? productsInCart.map(({ title, thumbnail, price, id, quantity }) => (
              <div key={ id }>
                <span>remover</span>
                <img src={ thumbnail } alt={ title } />
                <span data-testid="shopping-cart-product-name">{ title }</span>
                <span data-testid="shopping-cart-product-quantity">
                  <strong>
                    { quantity }
                  </strong>
                </span>
                <span>{ price }</span>
              </div>
            )) : (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            ) }
        </section>
      </main>
    );
  }
}
