import React from "react";
import classes from "./ProductGallery.module.css";

class ProductGallery extends React.Component {
  state = { activeImage: this.props.product.gallery[0] };

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
        <div className={classes.bigImage}>
          <img src={this.state.activeImage} alt={this.props.product.name} />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
