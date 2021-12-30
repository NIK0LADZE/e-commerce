import React from "react";
import classes from "./Loader.module.css";

class Loader extends React.Component {
  render() {
    return (
      <div className={classes.loader}>
        <div className={classes.ball}></div>
        <div className={classes.ball}></div>
        <div className={classes.ball}></div>
      </div>
    );
  }
}

export default Loader;
