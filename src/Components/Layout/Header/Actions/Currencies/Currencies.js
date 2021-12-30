import React from "react";
import Arrow from "../../../../../assets/arrow.svg";
import classes from "./Currencies.module.css";

class Currencies extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span className={classes.currencySign}>
          &#36;
          <img className={classes.arrow} src={Arrow} alt="arrow" />
        </span>
      </React.Fragment>
    );
  }
}

export default Currencies;
