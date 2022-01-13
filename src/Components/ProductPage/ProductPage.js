import React from "react";
import { gql } from "@apollo/client";
import { withRouter } from "../../helpers/withRouter";
import { getProduct } from "../../helpers/getProduct";
import CurrencyContext from "../../store/CurrencyContext";
import CartContext from "../../store/CartContext";
import Loader from "../UI/Loader/Loader";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductInfo from "./ProductInfo/ProductInfo";
import classes from "./ProductPage.module.css";

const product = gql`
  query GetProduct($productId: String!) {
    product(id: $productId) {
      id
      brand
      name
      inStock
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
  render() {
    if (this.props.loading) return <Loader />;

    if (this.props.error) {
      return <h1 className="error-message">{this.props.error.message}</h1>;
    }

    if (this.props.data) {
      const product = this.props.data.product;

      if (!product) return <h1 className="error-message">Product not found</h1>;

      return (
        <div className={classes.container}>
          <ProductGallery product={product} />
          <CurrencyContext.Consumer>
            {(currency) => (
              <CartContext.Consumer>
                {(cart) => <ProductInfo currency={currency} cart={cart} product={product} />}
              </CartContext.Consumer>
            )}
          </CurrencyContext.Consumer>
        </div>
      );
    }
  }
}

export default withRouter(getProduct(ProductPage, product));
