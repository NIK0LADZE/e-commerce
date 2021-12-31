import React from "react";
import Navigation from "./Navigation/Navigation";
import Logo from "../../../assets/logo.svg";
import Actions from "./Actions/Actions";
import classes from "./Header.module.css";

class Header extends React.Component {
  render() {
    return (
      <header className={classes.row}>
        <Navigation categories={this.props.categories} activeCategory={this.props.activeCategory} />
        <img src={Logo} className={classes.logo} alt="logo" />
        <Actions />
      </header>
    );
  }
}

export default Header;
