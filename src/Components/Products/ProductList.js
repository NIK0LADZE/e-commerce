import React from "react";
import { gql } from "@apollo/client";
import { withRouter } from "../../helpers/withRouter";
import { getProducts } from "../../helpers/getProducts";
import Loader from "../UI/Loader/Loader";
import classes from "./ProductList.module.css";

const products = gql`
  query GetProductsByCategory($categoryName: String!) {
    category(input: { title: $categoryName }) {
      products {
        id
        name
        gallery
        inStock
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
      let categoryName = this.props.categoryName;
      let products = this.props.data.category.products;
      return (
        <div className={classes.container}>
          <h1 className={classes.catName}>{categoryName}</h1>
          <ul className={classes.content}>
            {products.map((product) => {
              return (
                <li className={classes.productCard} key={product.id}>
                  {product.name}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default withRouter(getProducts(ProductList, products));
