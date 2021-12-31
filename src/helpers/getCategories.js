import { useQuery } from "@apollo/client";

export const getCategories = (Component, query) => (props) => {
  const { data, loading, error } = useQuery(query);

  return <Component {...props} data={data} loading={loading} error={error} />;
};
