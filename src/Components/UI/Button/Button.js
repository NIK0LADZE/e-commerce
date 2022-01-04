import React from "react";
import classes from "./Button.module.css";

class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        className={`${classes.button} ${classes.green}`}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
