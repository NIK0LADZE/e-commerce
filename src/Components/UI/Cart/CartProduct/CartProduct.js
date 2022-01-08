import React from "react";
import LeftArrow from "../../../../assets/arrow-left.svg";
import RightArrow from "../../../../assets/arrow-right.svg";
import classes from "./CartProduct.module.css";

class CartProduct extends React.Component {
  product = this.props.product;
  currentCurrency = this.props.currency.selectedCurrency;
  symbol = this.props.currency.selectedCurrencySymbol;
  price = this.props.price;
  amount = this.product.amount;

  state = { imageIndex: 0 };

  shouldComponentUpdate(nextProps) {
    this.currentCurrency = nextProps.currency.selectedCurrency;
    this.symbol = nextProps.currency.selectedCurrencySymbol;
    this.price = nextProps.price;
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

  nextImage = () => {
    if (this.state.imageIndex + 2 <= this.product.gallery.length) {
      this.setState({ imageIndex: this.state.imageIndex + 1 });
    }
  };

  prevImage = () => {
    if (this.state.imageIndex - 1 >= 0) {
      this.setState({ imageIndex: this.state.imageIndex - 1 });
    }
  };

  render() {
    const selectedAttributes = this.product.selectedAttributes;
    const selectedAttributesArr = Object.keys(selectedAttributes);
    const miniCart = this.props.type;

    return (
      <div className={`${classes.container} ${miniCart ? classes.miniCart : ""}`}>
        <div className={classes.data}>
          <div>
            <p className={`${miniCart ? classes.miniCartBrand : classes.brand}`}>
              {this.product.brand}
            </p>
            <p>{this.product.name}</p>
            <p className={`${miniCart ? classes.miniCartPrice : classes.price}`}>
              {this.symbol}
              {this.price}
            </p>
          </div>
          <ul className={classes.attributeList}>
            {selectedAttributesArr.map((attributeKey) => {
              const attributeValue = selectedAttributes[attributeKey].value;
              const attributeDisplayValue = selectedAttributes[attributeKey].displayValue;
              const swatchBg = attributeKey === "Color" ? attributeValue : "";
              return (
                <li
                  key={selectedAttributes[attributeKey]}
                  className={`${classes.attributeItem} ${
                    miniCart ? classes.miniCartAttributeItem : ""
                  }`}
                  style={{ backgroundColor: swatchBg }}
                >
                  {attributeKey !== "Color" && (
                    <span className={classes.attributeValue}>{attributeValue}</span>
                  )}
                  <span className={classes.tooltipText}>
                    {attributeKey}: {attributeDisplayValue}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.controlsAndImage}>
          <div className={classes.controls}>
            <div
              onClick={this.increment}
              className={`${classes.controlItem} ${miniCart ? classes.miniCartControlItem : ""}`}
            >
              <span>+</span>
            </div>
            <p className={`${!miniCart ? classes.productAmount : ""}`}>{this.amount}</p>
            <div
              onClick={this.decrement}
              className={`${classes.controlItem} ${miniCart ? classes.miniCartControlItem : ""}`}
            >
              <span>-</span>
            </div>
          </div>
          <div
            className={`${classes.imageContainer} ${
              miniCart ? classes.miniCartImageContainer : ""
            }`}
          >
            <img
              className={classes.image}
              src={this.product.gallery[this.state.imageIndex]}
              alt={this.product.name}
            />
            {!miniCart && (
              <img
                onClick={this.prevImage}
                className={classes.leftArrow}
                src={LeftArrow}
                alt="Previous"
              />
            )}
            {!miniCart && (
              <img
                onClick={this.nextImage}
                className={classes.rightArrow}
                src={RightArrow}
                alt="Next"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
