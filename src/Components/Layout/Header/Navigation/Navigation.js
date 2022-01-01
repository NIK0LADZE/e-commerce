import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      currentCategory: null,
    };
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  mouseEnterHandler() {
    this.setState({ active: false });
  }

  mouseLeaveHandler() {
    this.setState({ active: true });
  }

  render() {
    if (!this.props.activeCategory) {
      return (
        // When application starts location state is null, so below code redirects page
        // and sets state only once, when the application starts
        <Navigate to={this.props.categories[0]} state={this.props.categories[0]} replace={true} />
      );
    }

    if (this.props.activeCategory)
      return (
        <nav>
          <ul className={classes.navlist}>
            {this.props.categories.map((category) => {
              return (
                <li key={category} className={classes.navitem}>
                  <NavLink
                    to={`/${category}`}
                    state={category}
                    className={() =>
                      `${classes.navlink} ${
                        this.state.active &&
                        this.props.activeCategory === category &&
                        classes.active
                      }`
                    }
                    onMouseEnter={this.mouseEnterHandler}
                    onMouseLeave={this.mouseLeaveHandler}
                  >
                    {category}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      );
  }
}

export default Navigation;
