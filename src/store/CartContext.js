import React from "react";

const CartContext = React.createContext();

export class CartProvider extends React.Component {
  state = { totalAmount: 0, products: [] };

  onAddToCart = (productObj) => {
    let sameProductAndAttributes = false;
    const products = [...this.state.products];
    this.setState({ totalAmount: this.state.totalAmount + 1 });
    for (const product of products) {
      if (product.id === productObj.id && product.attributesId === productObj.attributesId) {
        sameProductAndAttributes = true;
        product.amount++;
        this.setState({ products: products });
        console.log(5);
        break;
      }
    }
    if (!sameProductAndAttributes) {
      this.setState({ products: [...this.state.products, { ...productObj, amount: 1 }] });
    }
    console.log(this.state.totalAmount);
    console.log(this.state.products);
  };

  render() {
    return (
      <CartContext.Provider value={{ ...this.state, addToCart: this.onAddToCart }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
