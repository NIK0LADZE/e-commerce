import React from "react";
import checkIcon from "../../../assets/checkIcon.svg";
import classes from "./AttributeSelector.module.css";

class AttributeSelector extends React.Component {
  render() {
    const { item, attributeName, attributeType, state } = this.props;
    const { id, value, displayValue } = item;
    const swatchBg = attributeType === "swatch" ? value : "";
    const attributeSelected = state[attributeName]?.displayValue === displayValue;

    return (
      <li
        key={id}
        className={classes.attributeItem}
        style={{
          backgroundColor: swatchBg,
        }}
        onClick={() =>
          this.props.selectAttribute(attributeName, {
            value,
            displayValue,
          })
        }
      >
        {attributeType === "swatch" && (
          <div
            className={`${classes.swatchAttribute} ${
              attributeSelected ? classes.swatchSelected : ""
            }`}
          >
            {attributeSelected && (
              <img className={classes.checkIcon} src={checkIcon} alt="Check icon" />
            )}
          </div>
        )}
        {attributeType !== "swatch" && (
          <p className={`${classes.itemValue} ${attributeSelected ? classes.selected : ""}`}>
            {value}
          </p>
        )}
      </li>
    );
  }
}

export default AttributeSelector;
