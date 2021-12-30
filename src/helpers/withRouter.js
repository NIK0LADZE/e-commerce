import { useLocation, useParams } from "react-router-dom";

export const withRouter = (Component) => (props) => {
  const location = useLocation();
  const params = useParams();

  return <Component {...props} location={location} params={params} />;
};
