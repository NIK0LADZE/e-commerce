import React from "react";
import AttributeSelector from "../../UI/AttributeSelector/AttributeSelector";
import Button from "../../UI/Button/Button";
import ErrorIcon from "../../UI/ErrorIcon/ErrorIcon";
import classes from "./ProductInfo.module.css";

class ProductInfo extends React.Component {
  state = { id: this.props.product.id, attributesId: "", selectedAttributes: {} };

  onSelectAttribute = (attributeName, attributeValue) => {
    const selectedAttributeObj = { [attributeName]: attributeValue };
    const selectedAttributes = { ...this.state.selectedAttributes, ...selectedAttributeObj };
    let attributesId = "";
    for (const key in selectedAttributes) {
      attributesId = attributesId + selectedAttributes[key];
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
    const currentCurrency = this.props.currency.selectedCurrency;
    const objectKeys = Object.keys(this.state.selectedAttributes);
    // Finds selected currency amount
    const price = this.props.product.prices.find(
      (priceObj) => priceObj.currency.label === currentCurrency
    ).amount;
    const canAddToCart = this.props.product.attributes.length === objectKeys.length;
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
          <Button onClick={this.onAddToCart} disabled={!currentCurrency || !canAddToCart}>
            add to cart
          </Button>
        </div>
        {/* Product Description */}
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: this.props.product.description }}
        />
      </div>
    );
  }
}

export default ProductInfo;
