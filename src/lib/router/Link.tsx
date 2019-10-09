import React, { useCallback, useMemo } from 'react';
import { useNavigate } from '.';

// QUESTION: Is there a better way to model this?  Basically I need either route and or params OR path.
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  route?: RouteDefinition;
  params?: object | undefined | null;
  path?: string;
};

const derivePathFromProps = ({ route, params, path}: Props) => {
  if (path) return path;

  if (!route) return null;
  
  const { getPath } = route;

  if (!getPath) return null;
  return getPath(params); 
};

const Link: React.FC<Props> = React.memo(({
  route,
  params,
  path,
  children,
  ...rest
}) => {  
  const navigate = useNavigate();

  const derivedPath = useMemo(() => derivePathFromProps({ route, params, path }), [route, params, path])

  if (!derivedPath) throw new Error('Could not derive path.  Check passed routes, params, and path.');
  
  const handleClick = useCallback((e) => {
    e.preventDefault();
    navigate(derivedPath);
  }, [derivedPath, navigate]);
  
  return (
    <a
      href={derivedPath}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
});

export default Link;