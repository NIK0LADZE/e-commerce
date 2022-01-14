import React from "react";
import { withRouter } from "../../helpers/withRouter";
import { getProduct } from "../../helpers/getProduct";
import { productQuery } from "../../helpers/gqlQueries";
import CurrencyContext from "../../store/CurrencyContext";
import CartContext from "../../store/CartContext";
import Loader from "../UI/Loader/Loader";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductInfo from "./ProductInfo/ProductInfo";
import classes from "./ProductPage.module.css";

class ProductPage extends React.Component {
  render() {
    const { data, loading, error } = this.props;

    if (loading) return <Loader />;

    if (error) {
      return <h1 className="error-message">{error.message}</h1>;
    }

    if (data) {
      const { product } = data;

      if (!product) return <h1 className="error-message">Product not found</h1>;

      return (
        <div className={classes.container}>
          <ProductGallery product={product} />
          <CurrencyContext.Consumer>
            {(currency) => (
              <CartContext.Consumer>
                {(cart) => <ProductInfo currency={currency} cart={cart} product={product} />}
              </CartContext.Consumer>
            )}
          </CurrencyContext.Consumer>
        </div>
      );
    }
  }
}

export default withRouter(getProduct(ProductPage, productQuery));
