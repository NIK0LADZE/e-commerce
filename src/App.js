import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Cards from "./Components/Cards/Cards";
import Layout from "./Components/Layout/Layout";
import "./App.css";

const dataQL = gql`
  query GetData {
    categories {
      name
      products {
        name
        prices {
          currency
          amount
        }
        gallery
      }
    }
  }
`;

const getData = (Component) => (props) => {
  const { data, loading, error } = useQuery(dataQL);

  return <Component {...props} data={data} loading={loading} error={error} />;
};

class App extends React.Component {
  render() {
    if (this.props.loading) return <h1>Loading...</h1>;

    if (this.props.error) return <pre>{this.props.error.message}</pre>;

    if (this.props.data) {
      console.log(this.props.data);
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
              <Route path="" element={<h1>All</h1>} />
              <Route path="/:categoryName" element={<Cards />} />
            </Route>
          </Routes>
        </div>
      );
    }
  }
}

export default getData(App);
