import React from 'react';
import styled from '@emotion/styled';
import { Link } from '../../lib/router/Link';
import { theme } from '../../constants/theme';

interface ListItem {
  id: string;
};

export interface Props<ItemType> {
  items: ItemType[];
  ListItem: React.FC<{ item: ItemType }>;
  getPath: (item: ItemType) => string;
  getIsActive: (item: ItemType) => boolean;
  listKey?: string;
  showCreate?: boolean;
  CreatableForm?: React.ReactNode;
};

// QUESTION: i don't remember...
export function List<ItemType extends ListItem>({
  items,
  ListItem,
  getPath,
  getIsActive,
  listKey = 'list',
  showCreate = false,
  CreatableForm,
}: Props<ItemType>) {  
  return (
    <ListUl>
      {showCreate && CreatableForm}
      {items.map((item) => {
        const itemKey = `${listKey}-${item.id}`;
        const path = getPath(item);
        const isActive = getIsActive(item);

        return (
          <li key={itemKey}>
            <Link path={path} className={isActive ? 'active' : ''} data-testid={`item-${item.id}`}>
              <ListItem item={item} />
            </Link>
          </li>
        )
      })}
    </ListUl>
  );
};

const ListUl = styled.ul`
  width: 100%;
  list-style: none;
  overflow-y: auto;
  flex: 1;

  a {
    color: inherit;
    display: block;
    padding: 15px 30px;
    border-bottom: 1px solid ${theme.border};

    &:hover, &.active {
      background-color: ${theme.hover};
    }

    strong {
      color: ${theme.primary};
    }

    h3 {
      font-size: 20px;
      color: ${theme.text};
      font-weight: normal;
      line-height: 1.3em;
    }

    h4 {
      font-size: 16px;
      color: ${theme.textLight};
      font-weight: normal;
    }

    h4 + h3 {
      margin-top: 7px;
    }
  }
`;