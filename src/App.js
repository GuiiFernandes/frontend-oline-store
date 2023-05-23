import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import { getProductsFromCategoryAndQuery } from './services/api';
import { addToCart } from './services/localStorage';
import ProductDetails from './pages/ProductDetails';

class App extends Component {
  state = {
    query: '',
    productList: [],
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  displayProducts = async (event) => {
    event.preventDefault();
    const { query } = this.state;
    const data = await getProductsFromCategoryAndQuery('', query);
    const productList = data.results;
    this.setState({ productList });
  };

  handleAddInCart = (product) => {
    addToCart(product);
  };

  render() {
    const { query, productList, productsInCart } = this.state;
    return (
      <>
        <Header
          handleChange={ this.handleChange }
          query={ query }
          displayProducts={ this.displayProducts }
        />
        <Switch>
          <Route path="/cart">
            <Cart productsInCart={ productsInCart } />
          </Route>
          <Route exact path="/">
            <Home productList={ productList } handleAddInCart={ this.handleAddInCart } />
          </Route>
          <Route path="/product/:id" component={ ProductDetails } />
        </Switch>
      </>
    );
  }
}

export default App;
