import React, { useCallback, useMemo } from 'react';
import List, { Props as ListProps } from '../common/List';
import { useRouter, useNavigate } from '../../lib/router';
import { ReactComponent as PlusIcon } from '../common/icons/add.svg';
import Placeholder from '../common/Placeholder';
import ListContainer from '../common/ListContainer';
import ModuleToolbar from '../common/ModuleToolbar';
import { QueryResult } from '@apollo/react-common';
import { QueryHookOptions } from '@apollo/react-hooks';

interface Props<OptionFragment, OptionsQuery, OptionsQueryVariables> {
  listTitle: string;
  ModuleIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  getIdFromParams: (params: any) => string;
  createRoute: RouteDefinition;
  listProps: {
    getPath: ListProps<OptionFragment>['getPath'];
    ListItem: ListProps<OptionFragment>['ListItem'];
    CreatableForm: ListProps<OptionFragment>['CreatableForm'];
  };
  createButtonTitle?: string;
  optionsQueryHook: (baseOptions?: QueryHookOptions<OptionsQuery, OptionsQueryVariables>) => QueryResult<OptionsQuery, OptionsQueryVariables>;
  optionsQueryVariables: OptionsQueryVariables;
  getConnectionFromData: (data: OptionsQuery | undefined) => any;
};

interface ListableItem {
  id: string;
};

function ModuleList<
  OptionFragment extends ListableItem,
  OptionsQuery,
  OptionsQueryVariables,
>({
  listTitle,
  ModuleIcon,
  getIdFromParams,
  createButtonTitle,
  createRoute,
  listProps,
  optionsQueryHook,
  optionsQueryVariables,
  getConnectionFromData,
}: Props<OptionFragment, OptionsQuery, OptionsQueryVariables>) {
  const navigate = useNavigate();
  const { id: routeId, params } = useRouter();
  const itemId = getIdFromParams(params);

  const getIsActive = useCallback((item: OptionFragment) => item.id === itemId, [itemId]);

  const showCreate = routeId === createRoute.id;
  
  const { data, loading } = optionsQueryHook({
    variables: optionsQueryVariables,
  });

  const connection = getConnectionFromData(data);

  const renderList = useCallback(() => {
    if (loading) return null;
    if (!connection) return <Placeholder Icon={ModuleIcon} message={`We're having trouble loading ${listTitle}`} />;
    
    return (
      <List<OptionFragment>
        items={connection.edges.map((edge: any) => edge.node)}
        getIsActive={getIsActive}
        showCreate={showCreate}
        {...listProps}
      />
    );
    // QUESTION: is it worth using get callback if so much is a dependency?
  }, [loading, getIsActive, showCreate, connection, ModuleIcon, listProps, listTitle]);

  const derivedCreateButton = useMemo(() => {
    if (!createButtonTitle) return undefined;

    return {
      onClick: () => navigate(createRoute.getPath ? createRoute.getPath() : createRoute.path),
      Icon: PlusIcon,
      title: createButtonTitle,
    }
  }, [createButtonTitle, navigate, createRoute]);

  return (
    <ListContainer>
      <ModuleToolbar
        title={listTitle}
        // subTitle={lunches ? `${lunches.edges.length} upcoming` : undefined}
        button={derivedCreateButton}
      />
      {renderList()}
    </ListContainer>
  );
};

export default ModuleList;
