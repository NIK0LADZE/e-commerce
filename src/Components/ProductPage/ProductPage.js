import React from "react";
import { gql } from "@apollo/client";
import { withRouter } from "../../helpers/withRouter";
import { getProduct } from "../../helpers/getProduct";
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

      if (!product.inStock)
        return (
          <div className={classes.container}>
            <h1 className={classes.errorMessage}>This product is not in stock</h1>
          </div>
        );

      return (
        <div className={classes.container}>
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      );
    }
  }
}

export default withRouter(getProduct(ProductPage, product));
