import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import { getProductsFromCategoryAndQuery } from './services/api';

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
    const productList = (await getProductsFromCategoryAndQuery('', query)).results;
    this.setState({ productList });
  };

  render() {
    const { query, productList } = this.state;
    return (
      <>
        <Header
          handleChange={ this.handleChange }
          query={ query }
          displayProducts={ this.displayProducts }
        />
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Home productList={ productList } />
          </Route>
          <Route path="/product/:id" component={ Product } />
        </Switch>
      </>
    );
  }
}

export default App;
