import React from 'react';
import styled from '@emotion/styled';
import Link from '../router/Link';

interface Props<T> {
  items: T[],
  ListItem: React.FC<{ item: T }>,
  getPath: (item: T) => string,
};

function List<T>({
  items,
  ListItem,
  getPath,
}: Props<T>) {  
  return (
    <ListUl>
      {items.map(item => (
        <li>
          <Link path={getPath(item)}>
            <ListItem item={item} />
          </Link>
        </li>
      ))}
    </ListUl>
  );
};

const ListUl = styled('ul')`
  width: 100%;
  list-style: none;

  a {
    padding: 20px;
  }
`;

export default List;