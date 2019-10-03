import React from 'react';
import { useRouter } from '.';


function withRouter<P>(PassedComponent: React.ElementType) {
  const NewComponent: React.FC<P> = (props) => {
    const routeState = useRouter();

    return (
      <PassedComponent
        {...props}
        routeState={routeState}
      />
    );
  };

  return NewComponent;
};

export default withRouter;
