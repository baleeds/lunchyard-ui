import React from 'react';
import styled from '@emotion/styled';
import Link from '../router/Link';
import theme from '../constants/theme';

interface ListItem {
  id: string,
};

interface Props<ItemType> {
  items: ItemType[],
  ListItem: React.FC<{ item: ItemType }>,
  getPath: (item: ItemType) => string,
  listKey?: string,
};

// QUESITION: 
function List<ItemType extends ListItem>({
  items,
  ListItem,
  getPath,
  listKey = 'list',
}: Props<ItemType>) {  
  return (
    <ListUl>
      {items.map((item) => {
        const itemKey = `${listKey}-${item.id}`;
        const path = getPath(item);

        return (
          <li key={itemKey}>
            <Link path={path}>
              <ListItem item={item} />
            </Link>
          </li>
        )
      })}
    </ListUl>
  );
};

const ListUl = styled('ul')`
  width: 100%;
  list-style: none;
  overflow-y: auto;
  flex: 1;

  a {
    color: inherit;
    display: block;
    padding: 10px 20px;
    border-bottom: 1px solid ${theme.border};

    &:hover {
      background-color: ${theme.hover};
    }
  }
`;

export default List;