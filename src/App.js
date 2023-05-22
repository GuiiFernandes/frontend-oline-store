import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
