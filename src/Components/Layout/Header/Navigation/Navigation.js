import React from "react";
import { NavLink } from "react-router-dom";
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
    return (
      <nav>
        <ul className={classes.navlist}>
          <li key={"all"} className={classes.navitem}>
            <NavLink
              to="/"
              className={(navData) =>
                `${classes.navlink} ${this.state.active && navData.isActive && classes.active}`
              }
              onMouseEnter={this.mouseEnterHandler}
              onMouseLeave={this.mouseLeaveHandler}
            >
              all
            </NavLink>
          </li>
          {this.props.categories.map((category) => {
            return (
              <li key={category} className={classes.navitem}>
                <NavLink
                  to={`/${category}`}
                  className={(navData) =>
                    `${classes.navlink} ${this.state.active && navData.isActive && classes.active}`
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
