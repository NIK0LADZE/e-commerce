import { useQuery } from "@apollo/client";

export const getProducts = (Component, productsByCategory) => (props) => {
  if (!props.canRender) {
    // When app starts, if canRender property is false, meaning location state isn't set yet,
    // it will return component in loading state to avoid POST request error
    return <Component {...props} loading={true} />;
  }

  const categoryName = props.params.categoryName ? props.params.categoryName : props.location.state;
  const { data, loading, error } = useQuery(productsByCategory, { variables: { categoryName } });

  return (
    <Component {...props} data={data} loading={loading} error={error} categoryName={categoryName} />
  );
};
