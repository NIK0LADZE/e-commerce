import React from "react";
import { gql } from "@apollo/client";
import { getCategories } from "./helpers/getCategories";
import { Route, Routes } from "react-router-dom";
import ProductList from "./Components/Products/ProductList";
import Layout from "./Components/Layout/Layout";
import Loader from "./Components/UI/Loader/Loader";
import "./App.css";

const categories = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

class App extends React.Component {
  render() {
    // I pass categories through here, because if categories fetching is in process,
    // it would be logical to put whole application on hold and render Loader component until it finishes.
    // Rendering Loader component only at Navigation would be ugly, in my opinion.
    if (this.props.loading) return <Loader />;

    if (this.props.error) return <h1 className="error-message">{this.props.error.message}</h1>;

    if (this.props.data) {
      return (
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  categories={this.props.data.categories.map((category) => {
                    return category.name;
                  })}
                />
              }
            >
              <Route path="" element={<ProductList />} />
              <Route path="/:categoryName" element={<ProductList />} />
            </Route>
          </Routes>
        </div>
      );
    }
  }
}

export default getCategories(App, categories);
