import React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import Select, { LunchyardSelectProps } from './Select';
import { Props as SelectProps } from 'react-select/src/Select';

interface Props<OptionType, QueryType, QueryVariablesType> {
  queryVariables: QueryVariablesType,
  queryHook: (baseOptions?: ApolloReactHooks.QueryHookOptions<QueryType, QueryVariablesType>) => ApolloReactCommon.QueryResult<QueryType, QueryVariablesType>,
  dataToOptions: (data?: QueryType) => OptionType[],
  selectProps: LunchyardSelectProps & SelectProps<OptionType>,
}

function DataSelect<OptionType, QueryType, QueryVariablesType>({
  queryHook,
  queryVariables,
  dataToOptions,
  selectProps,
}: Props<OptionType, QueryType, QueryVariablesType>) {
  const { data, loading } = queryHook(queryVariables);

  let options: OptionType[] = [];
  if (data) {
    options = dataToOptions(data);
  }
  
  return (
    <Select
      options={options}
      loading={loading}
      {...selectProps}
    />
  )
} 

export default DataSelect;
