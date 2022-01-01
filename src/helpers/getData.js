import { useQuery } from "@apollo/client";

export const getData = (Component, query) => (props) => {
  const { data, loading, error } = useQuery(query);

  return <Component {...props} data={data} loading={loading} error={error} />;
};
