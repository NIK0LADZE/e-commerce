import React from "react";
import classes from "./ProductGallery.module.css";

class ProductGallery extends React.Component {
  state = { activeImage: this.props.product.gallery[0], imageChanged: false };

  shouldComponentUpdate(nextProps, nextState) {
    const { activeImage: nextImage } = nextState;
    const { activeImage: prevImage } = this.state;

    if (nextImage !== prevImage) {
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
    const { activeImage, imageChanged } = this.state;
    const { product } = this.props;
    const { name, gallery } = product;

    return (
      <div className={classes.galleryContainer}>
        <ul className={classes.gallery}>
          {gallery.map((imageUrl, index) => {
            return (
              <li
                key={index}
                className={classes.galleryImage}
                onClick={() => this.selectImage(imageUrl)}
              >
                <img src={imageUrl} alt={name} />
              </li>
            );
          })}
        </ul>
        <div className={`${classes.bigImage} ${imageChanged ? classes.onImageChange : ""}`}>
          <img src={activeImage} alt={name} />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
