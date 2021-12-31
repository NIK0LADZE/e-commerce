import React from "react";
import { gql } from "@apollo/client";
import { withRouter } from "../../helpers/withRouter";
import { getProducts } from "../../helpers/getProducts";
import Loader from "../UI/Loader/Loader";
import classes from "./ProductList.module.css";

const productsByCategory = gql`
  query GetProductsByCategory($categoryName: String!) {
    category(input: { title: $categoryName }) {
      name
      products {
        id
        name
      }
    }
  }
`;

const allProducts = gql`
  query GetAllProducts {
    categories {
      products {
        id
        name
      }
    }
  }
`;

class ProductList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.loading !== this.props.loading || nextProps.data !== this.props.data) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.props.loading) return <Loader />;

    if (this.props.error) return <h1 className="error-message">{this.props.error.message}</h1>;

    if (this.props.data) {
      let categoryName = this.props.params.categoryName ? this.props.params.categoryName : "all";
      let data = this.props.data;
      return (
        <div className={classes.container}>
          <h1 className={classes.catName}>{categoryName}</h1>
          <ul>
            {categoryName !== "all" &&
              data.category.products.map((product) => {
                return <li key={product.id}>{product.name}</li>;
              })}
            {categoryName === "all" &&
              data.categories.map((category) => {
                return category.products.map((product) => {
                  return <li key={product.id}>{product.name}</li>;
                });
              })}
          </ul>
        </div>
      );
    }
  }
}

export default withRouter(getProducts(ProductList, allProducts, productsByCategory));
