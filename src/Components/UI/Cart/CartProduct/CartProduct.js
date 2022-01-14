import React from "react";
import LeftArrow from "../../../../assets/arrow-left.svg";
import RightArrow from "../../../../assets/arrow-right.svg";
import classes from "./CartProduct.module.css";

class CartProduct extends React.Component {
  product = this.props.product;
  state = { imageIndex: 0 };

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
    const { imageIndex } = this.state;
    const { type: miniCart, product, currency, price } = this.props;
    const { selectedCurrencySymbol } = currency;
    const { brand, name, gallery, selectedAttributes, amount } = product;
    const selectedAttributesArr = Object.keys(selectedAttributes);

    return (
      <div className={`${classes.container} ${miniCart ? classes.miniCart : ""}`}>
        <div className={classes.data}>
          <div>
            <p className={`${miniCart ? classes.miniCartBrand : classes.brand}`}>{brand}</p>
            <p>{name}</p>
            <p className={`${miniCart ? classes.miniCartPrice : classes.price}`}>
              {selectedCurrencySymbol}
              {price}
            </p>
          </div>

          <ul className={classes.attributeList}>
            {selectedAttributesArr.map((attributeKey) => {
              const { value, displayValue } = selectedAttributes[attributeKey];
              const swatchBg = attributeKey === "Color" ? value : "";
              const attributeItemClasses = `${classes.attributeItem} ${
                miniCart ? classes.miniCartAttributeItem : ""
              }`;

              return (
                <li
                  key={displayValue}
                  className={attributeItemClasses}
                  style={{ backgroundColor: swatchBg }}
                >
                  {attributeKey !== "Color" && (
                    <span className={classes.attributeValue}>{value}</span>
                  )}
                  <span className={classes.tooltipText}>
                    {attributeKey}: {displayValue}
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
            <p className={`${!miniCart ? classes.productAmount : ""}`}>{amount}</p>
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
            <img className={classes.image} src={gallery[imageIndex]} alt={name} />
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
