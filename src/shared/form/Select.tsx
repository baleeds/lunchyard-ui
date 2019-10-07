import React from 'react';
import ReactSelect from 'react-select';
import { Props as SelectProps } from 'react-select/src/Select';
import theme from '../../constants/theme';

interface Props {
  undercover?: boolean,
  contrast?: boolean,
  width?: number,
};

const getStyles = (
  undercover: Props['undercover'],
  width: Props['width'],
  contrast: Props['contrast'],
) => ({
  container: (styles: any) => ({
    ...styles,
    width: width || undefined,
  }),
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    minWidth: '200px',
    display: 'flex',
    backgroundColor: undercover ? 'transparent' : theme.blank,
    border: '2px solid transparent',
    borderColor: isFocused ? 'rgba(255,255,255,.7) !important' : 'transparent',
    boxShadow: undefined,
  }),
  menu: (styles: any) => ({
    ...styles,
    minWidth: '200px',
    color: theme.text,
  })
});

function Select<OptionType>({ undercover, contrast, width, ...props }: Props & SelectProps<OptionType>) {
  return (
    <ReactSelect
      styles={getStyles(undercover, width, contrast)}
      {...props}
    />
  );
};

export default Select;