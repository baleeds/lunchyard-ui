import React, { useCallback, useMemo } from 'react';
import List, { Props as ListProps } from './List';
import { useRouter, useNavigate } from '../../lib/router';
import { ReactComponent as PlusIcon } from '../common/icons/add.svg';
import Placeholder from './Placeholder';
import ListContainer from './ListContainer';
import ModuleToolbar from './ModuleToolbar';

interface Props<OptionFragment> {
  items: OptionFragment[] | null | undefined;
  listTitle: string;
  ModuleIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  getIdFromParams?: (params: any) => string;
  createRoute: RouteDefinition;
  createRoutePathProps?: any; 
  listProps: {
    getPath: ListProps<OptionFragment>['getPath'];
    ListItem: ListProps<OptionFragment>['ListItem'];
    CreatableForm: ListProps<OptionFragment>['CreatableForm'];
  };
  createButtonTitle?: string;
  loading?: boolean;
  limitWidth?: boolean;
};

interface ListableItem {
  id: string;
};

function CreatableNavList<
  OptionFragment extends ListableItem,
>({
  items,
  loading,
  listTitle,
  ModuleIcon,
  getIdFromParams,
  createButtonTitle,
  createRoute,
  createRoutePathProps,
  listProps,
  limitWidth,
}: Props<OptionFragment>) {
  const navigate = useNavigate();
  const { id: routeId, params } = useRouter();
  const itemId = getIdFromParams ? getIdFromParams(params) : null;

  const getIsActive = useCallback((item: OptionFragment) => item.id === itemId, [itemId]);

  const showCreate = routeId === createRoute.id;

  const renderList = useCallback(() => {
    if (loading) return null;
    if (!items) return <Placeholder Icon={ModuleIcon} message={`We're having trouble loading ${listTitle}`} />;
    
    return (
      <List<OptionFragment>
        items={items}
        getIsActive={getIsActive}
        showCreate={showCreate}
        {...listProps}
      />
    );
    // QUESTION: is it worth using get callback if so much is a dependency?
  }, [loading, getIsActive, showCreate, items, ModuleIcon, listProps, listTitle]);

  const derivedCreateButton = useMemo(() => {
    if (!createButtonTitle) return undefined;

    return {
      onClick: () => navigate(createRoute.getPath ? createRoute.getPath(createRoutePathProps) : createRoute.path),
      Icon: PlusIcon,
      title: createButtonTitle,
    }
  }, [createButtonTitle, navigate, createRoute]);

  const listContainerStyle = useMemo(() => limitWidth ? { maxWidth: 500 } : undefined, [limitWidth]);

  return (
    <ListContainer style={listContainerStyle}>
      <ModuleToolbar
        title={listTitle}
        // subTitle={lunches ? `${lunches.edges.length} upcoming` : undefined}
        button={derivedCreateButton}
      />
      {renderList()}
    </ListContainer>
  );
};

export default CreatableNavList;
