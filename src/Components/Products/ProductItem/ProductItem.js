import React from "react";
import cartIcon from "../../../assets/cart-white.svg";
import classes from "./ProductItem.module.css";

class ProductItem extends React.Component {
  render() {
    let product = this.props.product;
    return (
      <li
        className={`${classes.productCard} ${product.inStock ? classes.inStock : ""}`}
        key={product.id}
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
          {
            // Finds selected currency symbol
            product.prices.find((currencyObj) => currencyObj.currency.label === "USD").currency
              .symbol
          }
          {
            // Finds selected currency amount
            product.prices.find((currencyObj) => currencyObj.currency.label === "USD").amount
          }
        </p>
      </li>
    );
  }
}

export default ProductItem;
