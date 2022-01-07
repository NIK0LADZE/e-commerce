import React from "react";
import classes from "./CartProduct.module.css";

class CartProduct extends React.Component {
  product = this.props.product;
  currentCurrency = this.props.currency.selectedCurrency;
  symbol = this.props.currency.selectedCurrencySymbol;
  price = this.props.price;
  amount = this.product.amount;

  shouldComponentUpdate(nextProps) {
    this.amount = nextProps.product.amount;
    return true;
  }

  totalPriceChange = (price, amount) => {
    this.props.totalPriceChange(price, amount);
  };

  increment = () => {
    this.props.cart.addToCart(this.product);
  };

  decrement = () => {
    this.props.cart.removeFromCart(this.product);
  };

  render() {
    const selectedAttributes = this.product.selectedAttributes;
    const selectedAttributesArr = Object.keys(selectedAttributes);

    return (
      <div className={`${classes.container} ${classes.miniCart}`}>
        <div className={classes.data}>
          <div>
            <p className={classes.brand}>{this.product.brand}</p>
            <p>{this.product.name}</p>
            <p className={classes.price}>
              {this.symbol}
              {this.price}
            </p>
          </div>
          <ul className={classes.attributeList}>
            {selectedAttributesArr.map((attributeKey) => {
              const attributeValue = selectedAttributes[attributeKey];
              const swatchBg = attributeKey === "Color" ? attributeValue : "";
              return (
                <li
                  key={selectedAttributes[attributeKey]}
                  className={classes.attributeItem}
                  style={{ backgroundColor: swatchBg }}
                >
                  {attributeKey !== "Color" && (
                    <span className={classes.attributeValue}>{attributeValue}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.controlsAndImage}>
          <div className={classes.controls}>
            <div onClick={this.increment} className={classes.controlItem}>
              <span>+</span>
            </div>
            <p>{this.amount}</p>
            <div onClick={this.decrement} className={classes.controlItem}>
              <span>-</span>
            </div>
          </div>
          <img className={classes.image} src={this.product.gallery[0]} alt={this.product.name} />
        </div>
      </div>
    );
  }
}

export default CartProduct;
