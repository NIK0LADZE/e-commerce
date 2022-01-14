import React from "react";
import { getData } from "../../../../../helpers/getData";
import { currenciesQuery } from "../../../../../helpers/gqlQueries";
import { ClickOutside } from "../../../../UI/ClickOutside";
import CurrencyContext from "../../../../../store/CurrencyContext";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import Arrow from "../../../../../assets/arrow.svg";
import ErrorIcon from "../../../../UI/ErrorIcon/ErrorIcon";
import classes from "./Currencies.module.css";

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

  render() {
    const { show } = this.state;
    const { selectedCurrencySymbol, error } = this.context;

    return (
      <ClickOutside show={show} clickHandler={this.clickHandler}>
        <div className={classes.container} ref={this.wrapper}>
          <div onClick={!error && this.clickHandler}>
            <span className={classes.currencySign}>
              {error && <ErrorIcon />}
              {selectedCurrencySymbol}
              <img
                className={`${classes.arrow} ${this.state.show ? classes.arrowUp : ""}`}
                src={Arrow}
                alt="arrow"
              />
            </span>
          </div>
          {show && <CurrencySwitcher {...this.props} onSelect={this.clickHandler} />}
        </div>
      </ClickOutside>
    );
  }
}

export default getData(Currencies, currenciesQuery);
