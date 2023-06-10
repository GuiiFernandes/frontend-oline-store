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
    isAnimatingAdd: false,
    isAnimatingRemove: false,
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

  animatingAdd = () => {
    const timeOut = 500;
    this.setState({ isAnimatingAdd: true }, () => {
      setTimeout(() => this.setState({ isAnimatingAdd: false }), timeOut);
    });
  };

  animatingRemove = () => {
    const timeOut = 500;
    this.setState({ isAnimatingRemove: true }, () => {
      setTimeout(() => this.setState({ isAnimatingRemove: false }), timeOut);
    });
  };

  handleAddInCart = (product) => {
    this.animatingAdd();
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
    const { query, productList, cartCount, isAnimatingAdd, isAnimatingRemove,
      noSearch, sort, redirect, categories, categoriesOpen } = this.state;
    const mlCat = 'ml-category';

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
          isAnimatingAdd={ isAnimatingAdd }
          isAnimatingRemove={ isAnimatingRemove }
          getProducts={ this.getProducts }
          visibleCategories={ this.visibleCategories }
          redirect={ redirect }
        />
        <main className={ `main ${categoriesOpen ? mlCat : ''}` }>
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
                categoriesOpen={ categoriesOpen }
                animatingRemove={ this.animatingRemove }
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
                updateCartCount={ this.updateCartCount }
                animatingAdd={ this.animatingAdd }
              />) }
            />
            <Route
              path="/checkout"
              render={ (props) => (<Checkout
                { ...props }
                updateCartCount={ this.updateCartCount }
                categoriesOpen={ categoriesOpen }
              />) }
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
