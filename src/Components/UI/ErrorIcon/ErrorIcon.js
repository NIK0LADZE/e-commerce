import React from "react";
import classes from "./ErrorIcon.module.css";

class ErrorIcon extends React.Component {
  render() {
    return (
      <div className={classes.circle}>
        <span className={classes.exclamation}>!</span>
      </div>
    );
  }
}

export default ErrorIcon;
