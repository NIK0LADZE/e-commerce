import { useQuery } from "@apollo/client";

export const getProducts = (Component, allProducts, productsByCategory) => (props) => {
  const categoryName = props.params ? props.params.categoryName : null;
  const { data, loading, error } = !categoryName
    ? useQuery(allProducts)
    : useQuery(productsByCategory, { variables: { categoryName } });

  return <Component {...props} data={data} loading={loading} error={error} />;
};
