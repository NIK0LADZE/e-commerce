import React from "react";
import checkIcon from "../../../assets/checkIcon.svg";
import classes from "./AttributeSelector.module.css";

class AttributeSelector extends React.Component {
  render() {
    const item = this.props.item;
    const attributeName = this.props.attributeName;
    const attributeType = this.props.attributeType;
    const swatchBg = attributeType === "swatch" ? item.value : "";
    const attributeSelected = this.props.state[attributeName]?.displayValue === item.displayValue;

    return (
      <li
        key={item.id}
        className={classes.attributeItem}
        style={{
          backgroundColor: swatchBg,
        }}
        onClick={() =>
          this.props.selectAttribute(attributeName, {
            value: item.value,
            displayValue: item.displayValue,
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
            {item.value}
          </p>
        )}
      </li>
    );
  }
}

export default AttributeSelector;
