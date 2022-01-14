import React from "react";
import { withRouter } from "../../helpers/withRouter";
import { getProducts } from "../../helpers/getProducts";
import { productsByCategoryQuery } from "../../helpers/gqlQueries";
import Loader from "../UI/Loader/Loader";
import ProductItem from "./ProductItem/ProductItem";
import classes from "./ProductList.module.css";

class ProductList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.loading !== this.props.loading || nextProps.data !== this.props.data) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { data, loading, error, categoryName } = this.props;

    if (loading) return <Loader />;

    if (error) return <h1 className="error-message">{error.message}</h1>;

    if (data) {
      if (!data.category) return <h1 className="error-message">Category not found</h1>;
      const { products } = data.category;

      return (
        <div>
          <h1 className={classes.catName}>{categoryName}</h1>
          <ul className={classes.content}>
            {products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          </ul>
        </div>
      );
    }
  }
}

export default withRouter(getProducts(ProductList, productsByCategoryQuery));
