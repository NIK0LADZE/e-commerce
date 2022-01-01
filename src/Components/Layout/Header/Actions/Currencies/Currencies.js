import React from "react";
import Arrow from "../../../../../assets/arrow.svg";
import CurrencySwitcher from "../../../../UI/CurrencySwitcher/CurrencySwitcher";
import classes from "./Currencies.module.css";

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handler = this.handler.bind(this);
    this.wrapper = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapper.current.contains(event.target)) {
      if (this.state.show) {
        this.setState({
          show: false,
        });
      }
    }
  }

  handler() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div className={classes.container} ref={this.wrapper}>
        <div onClick={this.handler}>
          <span className={classes.currencySign}>
            &#36;
            <img
              className={`${classes.arrow} ${this.state.show ? classes.arrowUp : ""}`}
              src={Arrow}
              alt="arrow"
            />
          </span>
        </div>
        {this.state.show && <CurrencySwitcher onSelect={this.handler} />}
      </div>
    );
  }
}

export default Currencies;
