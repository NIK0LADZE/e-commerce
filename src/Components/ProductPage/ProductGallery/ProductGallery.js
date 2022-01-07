import React from "react";
import classes from "./ProductGallery.module.css";

class ProductGallery extends React.Component {
  state = { activeImage: this.props.product.gallery[0], imageChanged: false };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.activeImage !== this.state.activeImage) {
      this.setState({ imageChanged: true });

      const timer = setTimeout(() => {
        this.setState({ imageChanged: false });
      }, 1000);

      return () => clearTimeout(timer);
    }
    return true;
  }

  selectImage = (activeImage) => {
    this.setState({ activeImage });
  };

  render() {
    return (
      <div className={classes.galleryContainer}>
        <ul className={classes.gallery}>
          {this.props.product.gallery.map((imageUrl, index) => {
            return (
              <li
                key={index}
                className={classes.galleryImage}
                onClick={() => this.selectImage(imageUrl)}
              >
                <img src={imageUrl} alt={this.props.product.name} />
              </li>
            );
          })}
        </ul>
        <div
          className={`${classes.bigImage} ${this.state.imageChanged ? classes.onImageChange : ""}`}
        >
          <img src={this.state.activeImage} alt={this.props.product.name} />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
