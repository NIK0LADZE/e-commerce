import React from "react";
import classes from "./Navigation.module.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      currentCategory: props.currentCategory,
    };
  }

  mouseEnterHandler = () => {
    this.setState({ active: false });
  };

  mouseLeaveHandler = () => {
    this.setState({ active: true });
  };

  navigate = (currentCategory) => {
    this.setState({ currentCategory });
    this.props.navigate(`/${currentCategory}`);
  };

  render() {
    return (
      <nav>
        <ul className={classes.navlist}>
          {this.props.categories.map((category) => {
            return (
              <li
                key={category}
                className={`${classes.navlink} ${
                  this.state.active && this.state.currentCategory === category ? classes.active : ""
                }`}
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}
                onClick={() => this.navigate(category)}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
