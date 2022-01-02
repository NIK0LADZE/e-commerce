import React from "react";
import CurrencyContext from "../../../store/CurrencyContext";
import Button from "../../UI/Button/Button";
import ErrorIcon from "../../UI/ErrorIcon/ErrorIcon";
import classes from "./ProductInfo.module.css";

class ProductInfo extends React.Component {
  static contextType = CurrencyContext;

  render() {
    const currentCurrency = this.context.selectedCurrency;

    return (
      <div className={classes.info}>
        <h1 className={classes.brand}>{this.props.product.brand}</h1>
        <h2 className={classes.name}>{this.props.product.name}</h2>
        {this.props.product.attributes.map((attribute) => {
          return (
            <div key={attribute.name}>
              <p key={attribute.name} className={classes.attributeName}>
                {`${attribute.name}:`}
              </p>
              <ul className={classes.attributeList}>
                {attribute.items.map((item) => {
                  return (
                    <li
                      key={item.displayValue}
                      className={classes.attributeItem}
                      style={{
                        backgroundColor: `${attribute.type === "swatch" ? item.value : ""}`,
                      }}
                    >
                      {attribute.type !== "swatch" && (
                        <p className={classes.itemValue}>{item.value}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div>
          <p className={classes.attributeName}>price:</p>
          <p className={classes.price}>
            {currentCurrency &&
              this.props.product.prices.find(
                (priceObj) => priceObj.currency.label === currentCurrency
              ).currency.symbol}
            {currentCurrency &&
              this.props.product.prices.find(
                (priceObj) => priceObj.currency.label === currentCurrency
              ).amount}
            {!currentCurrency && <ErrorIcon />}
            <span className={classes.errorMessage}>{!currentCurrency && this.context.error}</span>
          </p>
        </div>
        <div className={classes.buttonContainer}>
          <Button disabled={!currentCurrency}>add to cart</Button>
        </div>
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: this.props.product.description }}
        />
      </div>
    );
  }
}

export default ProductInfo;
