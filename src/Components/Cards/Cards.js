import React from "react";
import { withRouter } from "../../helpers/withRouter";
// import classes from "./Cards.module.css";

class Cards extends React.Component {
  render() {
    let categoryName = this.props.params.categoryName;
    // console.log(this.props);
    return <h1>{categoryName}</h1>;
  }
}

export default withRouter(Cards);
