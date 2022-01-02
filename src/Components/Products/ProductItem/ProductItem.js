import React from "react";
import CurrencyContext from "../../../store/CurrencyContext";
import cartIcon from "../../../assets/cart-white.svg";
import classes from "./ProductItem.module.css";
import ErrorIcon from "../../UI/ErrorIcon/ErrorIcon";

class ProductItem extends React.Component {
  static contextType = CurrencyContext;
  state = { hover: false };

  render() {
    let product = this.props.product;
    return (
      <li
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        className={`${classes.productCard} ${
          product.inStock && !this.context.error
            ? this.state.hover
              ? `shadow ${classes.available}`
              : classes.available
            : ""
        }`}
      >
        <div className={classes.photoContainer}>
          <img className={classes.productImage} src={product.gallery[0]} alt={product.name} />
          <div className={classes.cartButton}>
            <img className={classes.cartIcon} src={cartIcon} alt="Add to cart" />
          </div>
          {!product.inStock && (
            <div className={classes.outOfStock}>
              <p className={classes.outText}>out of stock</p>
            </div>
          )}
        </div>
        <p className={classes.productName}>{product.name}</p>
        <p className={classes.price}>
          {/* Error message */}
          {this.context.error && <ErrorIcon />}
          {this.context.error && <span className={classes.errorMessage}>{this.context.error}</span>}
          {!this.context.error && this.context.selectedCurrencySymbol}
          {/* Finds selected currency amount */}
          {!this.context.error &&
            product.prices.find(
              (currencyObj) => currencyObj.currency.label === this.context.selectedCurrency
            ).amount}
        </p>
      </li>
    );
  }
}

export default ProductItem;
