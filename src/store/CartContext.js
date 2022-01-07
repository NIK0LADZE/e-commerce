import React from "react";

const CartContext = React.createContext();

export class CartProvider extends React.Component {
  state = { totalAmount: 0, products: [] };

  onAddToCart = (productObj) => {
    this.setState({ totalAmount: this.state.totalAmount + 1 });
    const existingProductIndex = this.state.products.findIndex(
      (product) => product.id === productObj.id && product.attributesId === productObj.attributesId
    );
    const existingProduct = this.state.products[existingProductIndex];
    if (existingProduct) {
      existingProduct.amount++;
      this.setState({ products: this.state.products });
    } else {
      this.setState({ products: [...this.state.products, { ...productObj, amount: 1 }] });
    }
  };

  onRemoveFromCart = (productObj) => {
    this.setState({ totalAmount: this.state.totalAmount - 1 });
    const existingProductIndex = this.state.products.findIndex(
      (product) => product.id === productObj.id && product.attributesId === productObj.attributesId
    );
    const existingProduct = this.state.products[existingProductIndex];
    if (existingProduct.amount > 1) {
      existingProduct.amount--;
      this.setState({ products: this.state.products });
    } else {
      const updatedCart = this.state.products.filter(
        (product) =>
          product.id !== productObj.id || product.attributesId !== productObj.attributesId
      );
      this.setState({ products: updatedCart });
    }
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
