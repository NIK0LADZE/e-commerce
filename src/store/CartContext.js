import React from "react";

const CartContext = React.createContext();

export class CartProvider extends React.Component {
  cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

  state = {
    totalAmount: 0,
    products: this.cart,
  };

  componentDidMount() {
    const totalAmount = this.calculateTotalAmount(this.cart);
    this.setState({ totalAmount: totalAmount });
  }

  onAddToCart = (productObj) => {
    const existingProductIndex = this.state.products.findIndex(
      (product) => product.id === productObj.id && product.attributesId === productObj.attributesId
    );
    const existingProduct = this.state.products[existingProductIndex];
    let updatedCart;

    if (existingProduct) {
      existingProduct.amount++;
      updatedCart = this.state.products;
      this.setState({ products: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      updatedCart = [...this.state.products, { ...productObj, amount: 1 }];
      this.setState({ products: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const totalAmount = this.calculateTotalAmount(updatedCart);
    this.setState({ totalAmount: totalAmount });
  };

  onRemoveFromCart = (productObj) => {
    const existingProductIndex = this.state.products.findIndex(
      (product) => product.id === productObj.id && product.attributesId === productObj.attributesId
    );
    const existingProduct = this.state.products[existingProductIndex];
    let updatedCart;

    if (existingProduct.amount > 1) {
      existingProduct.amount--;
      updatedCart = this.state.products;
      this.setState({ products: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      updatedCart = this.state.products.filter(
        (product) =>
          product.id !== productObj.id || product.attributesId !== productObj.attributesId
      );
      this.setState({ products: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const totalAmount = this.calculateTotalAmount(updatedCart);
    this.setState({ totalAmount: totalAmount });
  };

  calculateTotalAmount = (updatedCart) => {
    let totalAmount = 0;
    updatedCart.forEach((product) => {
      totalAmount += product.amount;
    });
    return totalAmount;
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addToCart: this.onAddToCart,
          removeFromCart: this.onRemoveFromCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
