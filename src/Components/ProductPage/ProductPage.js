import React from "react";
import { gql } from "@apollo/client";
import { withRouter } from "../../helpers/withRouter";
import { getProduct } from "../../helpers/getProduct";
import Loader from "../UI/Loader/Loader";
import classes from "./ProductPage.module.css";
import Button from "../UI/Button/Button";

const product = gql`
  query GetProduct($productId: String!) {
    product(id: $productId) {
      id
      brand
      name
      gallery
      description
      attributes {
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

class ProductPage extends React.Component {
  state = { activeImage: null, animation: false };

  static getDerivedStateFromProps(props, prevState) {
    if (props.data && !prevState.activeImage) {
      return { activeImage: props.data.product.gallery[0] };
    }
    return null;
  }

  selectImage = (activeImage) => {
    this.setState({ activeImage });
  };

  render() {
    if (this.props.loading) return <Loader />;

    if (this.props.error)
      return (
        <div className={classes.container}>
          <h1 className={classes.errorMessage}>{this.props.error.message}</h1>
        </div>
      );

    if (this.props.data) {
      const product = this.props.data.product;
      console.log(
        product.prices.find((priceObj) => priceObj.currency.label === "USD").currency.symbol
      );
      return (
        <div className={classes.container}>
          <div className={classes.galleryContainer}>
            <ul className={classes.gallery}>
              {product.gallery.map((imageUrl, index) => {
                return (
                  <li
                    key={index}
                    className={classes.galleryImage}
                    onClick={() => this.selectImage(imageUrl)}
                  >
                    <img src={imageUrl} alt={product.name} />
                  </li>
                );
              })}
            </ul>
            <div className={classes.bigImage}>
              <img src={this.state.activeImage} alt={product.name} />
            </div>
          </div>
          <div className={classes.info}>
            <h1 className={classes.brand}>{product.brand}</h1>
            <h2 className={classes.name}>{product.name}</h2>
            {product.attributes.map((attribute) => {
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
                {
                  product.prices.find((priceObj) => priceObj.currency.label === "USD").currency
                    .symbol
                }
                {product.prices.find((priceObj) => priceObj.currency.label === "USD").amount}
              </p>
            </div>
            <Button>add to cart</Button>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(getProduct(ProductPage, product));
