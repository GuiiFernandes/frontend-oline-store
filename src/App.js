import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import { getProductsFromCategoryAndQuery, getCategories } from './services/api';
import { addToCart } from './services/localStorage';
import './css/App.css';
import CategoryList from './components/CategoryList';

class App extends Component {
  state = {
    query: '',
    productList: [],
    cartCount: 0,
    noSearch: true,
    sort: '',
    redirect: false,
    categories: [],
    categoriesOpen: false,
  };

  async componentDidMount() {
    this.updateCartCount();
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  getProducts = async (event) => {
    event.preventDefault();
    this.setState({ redirect: true }, async () => {
      const { query } = this.state;
      const categoryId = event.target.name === 'category' ? event.target.id : '';
      const productList = (await getProductsFromCategoryAndQuery(categoryId, query));
      this.setState({
        productList: productList.results,
        noSearch: false,
        query: '',
        redirect: false,
        categoriesOpen: false,
      });
    });
  };

  handleAddInCart = (product) => {
    addToCart(product);
    this.updateCartCount();
  };

  visibleCategories = () => {
    this.setState(({ categoriesOpen }) => ({ categoriesOpen: !categoriesOpen }));
  };

  updateCartCount = () => {
    const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = productsInCart.reduce((sum, product) => sum + product.quantity, 0);
    this.setState({ cartCount });
  };

  render() {
    const { query, productList, cartCount,
      noSearch, sort, redirect, categories, categoriesOpen } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Header
          cartCount={ cartCount }
          handleChange={ this.handleChange }
          query={ query }
          categoriesOpen={ categoriesOpen }
          getProducts={ this.getProducts }
          visibleCategories={ this.visibleCategories }
          redirect={ redirect }
        />
        <main className="main">
          {
            categoriesOpen && <CategoryList
              handleAddInCart={ this.handleAddInCart }
              categories={ categories }
              getProducts={ this.getProducts }
              categoriesOpen={ categoriesOpen }
            />
          }
          <Switch>
            <Route
              path="/cart"
              render={ (props) => (<Cart
                { ...props }
                updateCartCount={ this.updateCartCount }
              />) }
            />
            <Route exact path="/">
              <Home
                getProducts={ this.getProducts }
                productList={ productList }
                categoriesOpen={ categoriesOpen }
                handleAddInCart={ this.handleAddInCart }
                handleChange={ this.handleChange }
                noSearch={ noSearch }
                sort={ sort }
              />
            </Route>
            <Route
              path="/product/:id"
              render={ (props) => (<Product
                { ...props }
                handleAddInCart={ this.handleAddInCart }
              />) }
            />
            <Route
              path="/checkout"
              render={ (props) => (<Checkout
                { ...props }
                updateCartCount={ this.updateCartCount }
              />) }
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
