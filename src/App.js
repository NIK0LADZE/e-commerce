import React from "react";
import { getData } from "./helpers/getData";
import { categoriesQuery } from "./helpers/gqlQueries";
import { Route, Routes, Navigate } from "react-router-dom";
import { withRouter } from "./helpers/withRouter";
import ProductList from "./Components/Products/ProductList";
import Layout from "./Components/Layout/Layout";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";
import Loader from "./Components/UI/Loader/Loader";
import "./App.css";

class App extends React.Component {
  render() {
    // I pass categories through here, because if categories fetching is in process,
    // it would be logical to put whole application on hold and render Loader component until it finishes.
    // Rendering Loader component only at Navigation would be ugly, in my opinion.
    const { data, loading, error } = this.props;

    if (loading) return <Loader />;

    if (error) return <h1 className="error-message">{error.message}</h1>;

    if (data) {
      // const pathName = this.props.location.pathname.split("/")[1];
      // const categoryName = pathName ? pathName : this.props.data.categories[0].name;
      // this.props.location.state = categoryName;
      // console.log(pathName);

      return (
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Layout categories={this.props.data.categories.map((category) => category.name)} />
              }
            >
              <Route path="/" element={<ProductList categoryName="all" />} />
              <Route path="/all" element={<Navigate to="/" />} />
              <Route path=":categoryName" element={<ProductList />} />
              <Route path="/products">
                <Route path="" element={<Navigate to="/" />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </div>
      );
    }
  }
}

export default withRouter(getData(App, categoriesQuery));
