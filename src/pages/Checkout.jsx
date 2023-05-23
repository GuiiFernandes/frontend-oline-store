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
      <>
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
        <form>
          <div>
            <label htmlFor="fullname">Nome Completo:</label>
            <input type="text" id="fullname" data-testid="checkout-fullname" required />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" data-testid="checkout-email" required />
          </div>

          <div>
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" data-testid="checkout-cpf" required />
          </div>

          <div>
            <label htmlFor="phone">Telefone:</label>
            <input type="text" id="phone" data-testid="checkout-phone" required />
          </div>

          <div>
            <label htmlFor="cep">CEP:</label>
            <input type="text" id="cep" data-testid="checkout-cep" required />
          </div>

          <div>
            <label htmlFor="address">Endereço:</label>
            <input type="text" id="address" data-testid="checkout-address" required />
          </div>

          <div>
            <h3>Método de pagamento:</h3>
            <div>
              <input
                type="radio"
                id="ticket"
                name="payment"
                data-testid="ticket-payment"
                required
              />
              <label htmlFor="ticket">Boleto</label>
            </div>
            <div>
              <input
                type="radio"
                id="visa"
                name="payment"
                data-testid="visa-payment"
                required
              />
              <label htmlFor="visa">Visa</label>
            </div>
            <div>
              <input
                type="radio"
                id="master"
                name="payment"
                data-testid="master-payment"
                required
              />
              <label htmlFor="master">MasterCard</label>
            </div>
            <div>
              <input
                type="radio"
                id="elo"
                name="payment"
                data-testid="elo-payment"
                required
              />
              <label htmlFor="elo">Elo</label>
            </div>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}
