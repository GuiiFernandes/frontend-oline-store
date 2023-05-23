import React, { Component } from 'react';

export default class Checkout extends Component {
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
      <section>
        <h1>Revise seus produtos</h1>
        { productsInCart.map(({ title, thumbnail, price, id }) => (
          <div key={ id }>
            <img src={ thumbnail } alt={ title } />
            <span data-testid="shopping-cart-product-name">{ title }</span>
            <span>{ price }</span>
          </div>
        )) }
      </section>
    );
  }
}
