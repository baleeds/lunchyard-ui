import { useContext } from "react";
import { RouteContext } from ".";

export const useRouter = () => {
  const { routeState } = useContext(RouteContext);

  return routeState;
};

export const useNavigate = () => {
  const { router } = useContext(RouteContext);

  if (!router) return () => { };

  return router.navigate.bind(router);
};