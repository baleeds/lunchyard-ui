import React from 'react';
import Placeholder from './Placeholder';
import { ReactComponent as Store } from './icons/store.svg';
import { ReactComponent as Plate } from './icons/plate.svg';
import { QueryResult } from '@apollo/react-common';

interface Props<T> {
  ensure?: string[],
  children: (data: T) => JSX.Element,
}

function ensuredPropertiesExist<T>(data: T, ensure: Props<T>['ensure']) {
  if (!ensure) return true;
  
  const keys = Object.keys(data);
  return ensure.every(keyToEnsure => keys.includes(keyToEnsure));
}

function SafetyWrapper<T>({
  data,
  loading,
  error,
  ensure,
  children,
}: Props<T> & QueryResult<T>) {
  if (loading) return <Placeholder Icon={Store} />;

  if (!!error || !data || !ensuredPropertiesExist<T>(data, ensure)) return <Placeholder Icon={Plate} message="We've encountered an error" />;

  if (children) return children(data);
  return null;
};

export default SafetyWrapper;
