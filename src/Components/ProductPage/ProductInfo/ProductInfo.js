import React from "react";
import DOMPurify from "dompurify";
import AttributeSelector from "../../UI/AttributeSelector/AttributeSelector";
import Button from "../../UI/Button/Button";
import ErrorIcon from "../../UI/ErrorIcon/ErrorIcon";
import classes from "./ProductInfo.module.css";

class ProductInfo extends React.Component {
  state = {
    attributesId: "",
    selectedAttributes: {},
  };

  onSelectAttribute = (attributeName, attributeObj) => {
    const selectedAttributeObj = { [attributeName]: attributeObj };
    const selectedAttributes = { ...this.state.selectedAttributes, ...selectedAttributeObj };
    let attributesId = "";
    for (const key in selectedAttributes) {
      attributesId = attributesId + selectedAttributes[key].displayValue;
    }
    this.setState({
      attributesId,
      selectedAttributes,
    });
  };

  onAddToCart = () => {
    this.props.cart.addToCart({ ...this.props.product, ...this.state });
  };

  render() {
    const { selectedAttributes } = this.state;
    const { currency, product } = this.props;
    const { brand, name, attributes, prices, description, inStock } = product;
    const { selectedCurrency, selectedCurrencySymbol, error } = currency;
    const objectKeys = Object.keys(this.state.selectedAttributes);
    const canAddToCart = attributes.length === objectKeys.length;
    // Finds selected currency amount
    const selectedCurrencyPrice = prices.find(
      (priceObj) => priceObj.currency.label === selectedCurrency
    ).amount;

    return (
      <div className={classes.info}>
        <h1 className={classes.brand}>{brand}</h1>
        <h2 className={classes.name}>{name}</h2>

        {attributes.map((attribute) => {
          const { name, type, items } = attribute;

          return (
            <div key={name}>
              <p key={name} className={classes.attributeName}>
                {`${name}:`}
              </p>
              <ul className={classes.attributeList}>
                {items.map((item) => {
                  return (
                    <AttributeSelector
                      key={item.id}
                      selectAttribute={this.onSelectAttribute}
                      item={item}
                      attributeName={name}
                      attributeType={type}
                      state={selectedAttributes}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}

        <div>
          <p className={classes.attributeName}>price:</p>
          <p className={classes.price}>
            {selectedCurrency && selectedCurrencySymbol}
            {selectedCurrency && selectedCurrencyPrice}
            {!selectedCurrency && <ErrorIcon />}
            <span className={classes.errorMessage}>{!selectedCurrency && error}</span>
          </p>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            onClick={this.onAddToCart}
            type={"green"}
            disabled={error || !canAddToCart || !inStock}
          >
            add to cart
          </Button>
        </div>
        {inStock && !canAddToCart && (
          <h1 className={classes.errorMessage}>Select attributes Please.</h1>
        )}
        {!inStock && (
          <h1 className={classes.errorMessage}>This product is currently not in stock</h1>
        )}
        {/* Product Description */}
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </div>
    );
  }
}

export default ProductInfo;
