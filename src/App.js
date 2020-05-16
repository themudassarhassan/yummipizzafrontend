import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { NavigationBar, Header } from "./common";
import { Menu, Login, Signup, Cart, PreviousOrders } from "./components";
import { PrivateRoute } from "./routes/privateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./webConfig";

class App extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      cart: [],
      isLoggedIn: localStorage.getItem("token") ? true : false,
    };
  }
  getMenuFromServer = async () => {
    try {
      let result = await fetch(`${API.baseURL}/api/menu`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      this.setState({ menu: result.menu });
    } catch (error) {
      console.log(error.message);
    }
  };
  async componentDidMount() {
    await this.getMenuFromServer();
  }

  handleAddToCart = (menuItem) => {
    const cart = [...this.state.cart];
    const menu = [...this.state.menu];
    const index = menu.indexOf(menuItem);
    menuItem.quantity = 1;
    // menu[index].isAdded = true;
    cart.push(menuItem);
    this.setState({ cart });
  };

  handleQuantityIncrement = (item) => {
    const cart = [...this.state.cart];
    const index = cart.indexOf(item);
    cart[index].quantity++;
    this.setState({ cart });
  };
  handleQuantityDecrement = (item) => {
    let cart;
    if (item.quantity === 1)
      cart = this.state.cart.filter((el) => el.id !== item.id);
    else {
      cart = [...this.state.cart];
      const index = cart.indexOf(item);
      cart[index].quantity--;
    }
    this.setState({ cart });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ isLoggedIn: false });
  };

  handleCheckout = () => {
    this.setState({ cart: [] });
  };
  render() {
    return (
      <div className="App">
        <NavigationBar
          isLoggedIn={this.state.isLoggedIn}
          onLogOut={this.handleLogout}
        />
        <Header />
        <div className="container">
          <Switch>
            <Route path="/login">
              <Login onLogin={this.handleLogin} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/cart">
              <Cart
                data={this.state.cart}
                onIncrement={this.handleQuantityIncrement}
                onDecrement={this.handleQuantityDecrement}
                isLoggedIn={this.state.isLoggedIn}
                onCheckout={this.handleCheckout}
              />
            </Route>
            <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/history">
              <PreviousOrders />
            </PrivateRoute>
            <Route path="/">
              <Menu
                data={this.state.menu}
                cart={this.state.cart}
                onAddToCartClick={this.handleAddToCart}
              />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
