import React from "react";
import { gql } from "@apollo/client";
import { getData } from "../../../../../helpers/getData";
import CurrencyContext from "../../../../../store/CurrencyContext";
import CurrencySwitcher from "../../../../UI/CurrencySwitcher/CurrencySwitcher";
import Arrow from "../../../../../assets/arrow.svg";
import classes from "./Currencies.module.css";
import ErrorIcon from "../../../../UI/ErrorIcon/ErrorIcon";

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
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (!this.wrapper.current.contains(event.target)) {
      if (this.state.show) {
        this.setState({
          show: false,
        });
      }
    }
  };

  clickHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
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
    );
  }
}

export default getData(Currencies, currencies);
