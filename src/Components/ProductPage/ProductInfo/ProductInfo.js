import React from "react";
import AttributeSelector from "../../UI/AttributeSelector/AttributeSelector";
import Button from "../../UI/Button/Button";
import ErrorIcon from "../../UI/ErrorIcon/ErrorIcon";
import classes from "./ProductInfo.module.css";

class ProductInfo extends React.Component {
  product = this.props.product;
  brand = this.product.brand;
  name = this.product.name;
  attributes = this.product.attributes;
  prices = this.product.prices;
  description = this.product.description;

  state = {
    id: this.props.product.id,
    brand: this.brand,
    name: this.name,
    attributesId: "",
    selectedAttributes: {},
    prices: this.prices,
    gallery: this.product.gallery,
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
    this.props.cart.addToCart(this.state);
  };

  render() {
    const objectKeys = Object.keys(this.state.selectedAttributes);
    const currentCurrency = this.props.currency.selectedCurrency;
    // Finds selected currency amount
    const price = this.prices.find(
      (priceObj) => priceObj.currency.label === currentCurrency
    ).amount;
    const canAddToCart = this.props.product.attributes.length === objectKeys.length;

    return (
      <div className={classes.info}>
        <h1 className={classes.brand}>{this.brand}</h1>
        <h2 className={classes.name}>{this.name}</h2>
        {this.attributes.map((attribute) => {
          return (
            <div key={attribute.name}>
              <p key={attribute.name} className={classes.attributeName}>
                {`${attribute.name}:`}
              </p>
              <ul className={classes.attributeList}>
                {attribute.items.map((item) => {
                  return (
                    <AttributeSelector
                      key={item.id}
                      selectAttribute={this.onSelectAttribute}
                      item={item}
                      attributeName={attribute.name}
                      attributeType={attribute.type}
                      state={this.state.selectedAttributes}
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
            {currentCurrency && this.props.currency.selectedCurrencySymbol}
            {currentCurrency && price}
            {!currentCurrency && <ErrorIcon />}
            <span className={classes.errorMessage}>{!currentCurrency && this.context.error}</span>
          </p>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            onClick={this.onAddToCart}
            type={"green"}
            disabled={!this.currentCurrency || !canAddToCart || !this.product.inStock}
          >
            add to cart
          </Button>
        </div>
        {!this.product.inStock && (
          <h1 className={classes.errorMessage}>This product is currently not in stock</h1>
        )}
        {/* Product Description */}
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: this.description }}
        />
      </div>
    );
  }
}

export default ProductInfo;
