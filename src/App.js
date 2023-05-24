import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import { getProductsFromCategoryAndQuery } from './services/api';
import { addToCart } from './services/localStorage';

class App extends Component {
  constructor() {
    super();
    this.updateCartCount = this.updateCartCount.bind(this);
  }

  state = {
    query: '',
    productList: [],
    cartCount: 0,
  };

  componentDidMount() {
    this.updateCartCount();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  displayProducts = async (event) => {
    event.preventDefault();
    const { query } = this.state;
    const productList = (await getProductsFromCategoryAndQuery('', query)).results;
    this.setState({ productList });
  };

  handleAddInCart = (product) => {
    addToCart(product);
    this.updateCartCount();
  };

  updateCartCount() {
    const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = productsInCart.reduce((sum, product) => sum + product.quantity, 0);
    this.setState({ cartCount });
  }

  render() {
    const { query, productList, productsInCart, cartCount } = this.state;
    return (
      <>
        <Header
          cartCount={ cartCount }
          handleChange={ this.handleChange }
          query={ query }
          displayProducts={ this.displayProducts }
        />
        <Switch>
          <Route path="/cart">
            <Cart
              productsInCart={ productsInCart }
              updateCartCount={ this.updateCartCount }
            />
          </Route>
          <Route exact path="/">
            <Home productList={ productList } handleAddInCart={ this.handleAddInCart } />
          </Route>
          <Route
            path="/product/:id"
            render={ (props) => (<Product
              { ...props }
              handleAddInCart={ this.handleAddInCart }
            />) }
          />

          <Route
            path="/Checkout"
            render={ (props) => (<Checkout
              { ...props }
              updateCartCount={ this.updateCartCount }
            />) }
          />
        </Switch>
      </>
    );
  }
}

export default App;
