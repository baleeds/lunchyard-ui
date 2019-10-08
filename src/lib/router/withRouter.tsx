import React from 'react';
import { useRouter } from '.';
import { useNavigate } from './hooks';

/**
 * Provides routeState and navigate function to a component
 * @param PassedComponent component to provide with routeState and navigate props
 */
function withRouter<Props>(PassedComponent: React.ElementType) {
  const NewComponent: React.FC<Props> = (props) => {
    const routeState = useRouter();
    const navigate = useNavigate();

    return (
      <PassedComponent
        {...props}
        routeState={routeState}
        navigate={navigate}
      />
    );
  };

  return NewComponent;
};

export default withRouter;
