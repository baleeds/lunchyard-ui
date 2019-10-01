import React, { useCallback } from 'react';
import { useNavigate } from '.';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  route: RouteDefinition,
  params?: object | undefined | null,
};

const Link: React.FC<Props> = ({ route, params, children, ...rest }) => {
  const navigate = useNavigate();

  const { getPath } = route;

  const href = getPath(params);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    navigate(href);
  }, [href, navigate]);
  
  return (
    <a
      href={href}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;