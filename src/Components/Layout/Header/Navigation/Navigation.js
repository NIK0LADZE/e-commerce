import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
  }

  mouseEnterHandler = () => {
    this.setState({ active: false });
  };

  mouseLeaveHandler = () => {
    this.setState({ active: true });
  };

  render() {
    const { active } = this.state;
    const { categories } = this.props;

    return (
      <nav>
        <ul className={classes.navlist}>
          {categories.map((category) => {
            return (
              <li key={category} className={classes.navitem}>
                <NavLink
                  to={`/${category === "all" ? "" : category}`}
                  className={({ isActive }) =>
                    `${classes.navlink} ${active && isActive && classes.active}`
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
