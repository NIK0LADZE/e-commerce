import { useQuery } from "@apollo/client";

export const getProducts = (Component, productsByCategory) => (props) => {
  const categoryName = props.params.categoryName ? props.params.categoryName : props.categoryName;
  const { data, loading, error } = useQuery(productsByCategory, { variables: { categoryName } });

  return (
    <Component {...props} data={data} loading={loading} error={error} categoryName={categoryName} />
  );
};
