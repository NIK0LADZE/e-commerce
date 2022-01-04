import React from "react";
import { gql } from "@apollo/client";
import { getData } from "../../../../../helpers/getData";
import { ClickOutside } from "../../../../UI/ClickOutside";
import CurrencyContext from "../../../../../store/CurrencyContext";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import Arrow from "../../../../../assets/arrow.svg";
import ErrorIcon from "../../../../UI/ErrorIcon/ErrorIcon";
import classes from "./Currencies.module.css";

const currencies = gql`
  query GetCurrenies {
    currencies {
      label
      symbol
    }
  }
`;

class Currencies extends React.Component {
  static contextType = CurrencyContext;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  clickHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  clickOutsideHandler = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <ClickOutside show={this.state.show} clickHandler={this.clickOutsideHandler}>
        <div className={classes.container} ref={this.wrapper}>
          <div onClick={!this.context.error && this.clickHandler}>
            <span className={classes.currencySign}>
              {this.context.error && <ErrorIcon />}
              {this.context.selectedCurrencySymbol}
              <img
                className={`${classes.arrow} ${this.state.show ? classes.arrowUp : ""}`}
                src={Arrow}
                alt="arrow"
              />
            </span>
          </div>
          {this.state.show && <CurrencySwitcher {...this.props} onSelect={this.clickHandler} />}
        </div>
      </ClickOutside>
    );
  }
}

export default getData(Currencies, currencies);
