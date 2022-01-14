import React from "react";
import { Link } from "react-router-dom";
import CurrencyContext from "../../../store/CurrencyContext";
import ErrorIcon from "../../UI/ErrorIcon/ErrorIcon";
import cartIcon from "../../../assets/cart-white.svg";
import classes from "./ProductItem.module.css";

class ProductItem extends React.Component {
  static contextType = CurrencyContext;
  state = { hover: false };

  render() {
    const { hover } = this.state;
    const { product } = this.props;
    const { selectedCurrency, selectedCurrencySymbol, error } = this.context;
    const { id, name, prices, gallery, inStock } = product;
    const productCardClasses = `${classes.productCard} ${
      !error ? (hover ? `shadow ${classes.available}` : classes.available) : ""
    }`;

    return (
      <li
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        className={productCardClasses}
      >
        <div className={classes.photoContainer}>
          {!error && (
            <React.Fragment>
              <Link to={`/products/${id}`}>
                <img className={classes.productImage} src={gallery[0]} alt={name} />
                {!inStock && (
                  <div className={classes.outOfStock}>
                    <p className={classes.outText}>out of stock</p>
                  </div>
                )}
              </Link>
              {inStock && (
                <Link to={`/products/${id}`}>
                  <div className={classes.cartButton}>
                    <img className={classes.cartIcon} src={cartIcon} alt={name} />
                  </div>
                </Link>
              )}
            </React.Fragment>
          )}

          {error && (
            <React.Fragment>
              <img className={classes.productImage} src={gallery[0]} alt={name} />
              {!inStock && (
                <div className={classes.outOfStock}>
                  <p className={classes.outText}>out of stock</p>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        <p className={`${classes.productName} ${!inStock ? classes.inactive : ""}`}>{name}</p>
        <p className={`${classes.price} ${!inStock ? classes.inactive : ""}`}>
          {/* Error message */}
          {error && <ErrorIcon />}
          {error && <span className={classes.errorMessage}>{error}</span>}
          {!error && selectedCurrencySymbol}
          {/* Finds selected currency amount */}
          {!error &&
            prices.find((currencyObj) => currencyObj.currency.label === selectedCurrency).amount}
        </p>
      </li>
    );
  }
}

export default ProductItem;
