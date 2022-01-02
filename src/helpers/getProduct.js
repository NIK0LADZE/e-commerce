import { useQuery } from "@apollo/client";

export const getProduct = (Component, productQuery) => (props) => {
  const productId = props.params.productId;
  const { data, loading, error } = useQuery(productQuery, { variables: { productId } });

  return <Component {...props} data={data} loading={loading} error={error} />;
};
