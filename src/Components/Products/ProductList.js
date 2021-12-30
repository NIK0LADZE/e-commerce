import React from "react";
import { withRouter } from "../../helpers/withRouter";
import classes from "./ProductList.module.css";

class ProductList extends React.Component {
  render() {
    let categoryName = this.props.params.categoryName ? this.props.params.categoryName : "all";
    return (
      <div className={classes.container}>
        <h1 className={classes.catName}>{categoryName}</h1>
      </div>
    );
  }
}

export default withRouter(ProductList);
