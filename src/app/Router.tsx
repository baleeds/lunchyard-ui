import React from 'react';
import Lunches from '../lunches/Lunches';
import Restaurants from '../restaurants/Restaurants';
import routes from '../constants/routes';
import { useRouter } from '../router';

const Router: React.FC = () => {
  const { id } = useRouter();

  switch (id) {
    case routes.root.id:
    case routes.lunches.id:
    case routes.lunchDetails.id:
      return <Lunches />
    case routes.restaurants.id:
      return <Restaurants />;
    default:
      return <div>Not found</div>;
  }
};

export default Router;