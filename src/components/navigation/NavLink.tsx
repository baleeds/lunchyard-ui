import React from 'react';
import { Link, LinkGetProps } from '@reach/router';

interface Props {
  to: string;
  children: string | JSX.Element;
};

const getActive = (props: LinkGetProps) => {
  const { isPartiallyCurrent } = props;

  return {
    'data-active': isPartiallyCurrent,
  }
};

export const NavLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Link to={to} getProps={getActive}>{children}</Link>
  );
};
