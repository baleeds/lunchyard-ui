import React from 'react';
import Lunches from '../lunches/Lunches';
import Restaurants from '../restaurants/Restaurants';

interface Props {
  routeState: RouteState,
}

const Router: React.FC<Props> = ({ routeState }) => {
  const { id, params } = routeState;

  console.log(id, params);

  switch (id) {
    case 'lunches':
    case 'lunchDetails':
      return <Lunches lunchId={params.lunchId} />
    case 'restaurants':
      return <Restaurants />;
    default:
      return <div>Not found</div>;
  }
};

export default Router;