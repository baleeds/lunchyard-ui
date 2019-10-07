import React from 'react';
import ReactSelect from 'react-select';
import { Props as SelectProps } from 'react-select/src/Select';
import theme from '../../../constants/theme';

export interface LunchyardSelectProps {
  undercover?: boolean,
  contrast?: boolean,
  width?: number,
};

const getStyles = (
  undercover: LunchyardSelectProps['undercover'],
  width: LunchyardSelectProps['width'],
  contrast: LunchyardSelectProps['contrast'],
) => ({
  container: (styles: any) => ({
    ...styles,
    width: width || undefined,
  }),
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    borderRadius: 10,
    fontSize: 20,
    color: contrast ? theme.blank : theme.text,
    minWidth: 200,
    display: 'flex',
    backgroundColor: undercover ? (isFocused ? 'rgba(0,0,0,.2)' : 'transparent') : theme.blank,
    border: '2px solid transparent !important',
    borderColor: isFocused ? 'rgba(255,255,255,.7) !important' : 'transparent',
    boxShadow: undefined,
  }),
  menu: (styles: any) => ({
    ...styles,
    minWidth: '200px',
    color: theme.text,
    marginTop: 0,
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: '5px 13px',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: contrast ? theme.blank : theme.text,
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    display: undercover ? 'none' : 'block',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: contrast ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.5',
  }),
  option: (styles: any, { isSelected, isFocused }: any) => ({
    ...styles,
    backgroundColor: isSelected ? theme.secondary : (isFocused ? theme.border : 'transparent') ,
  }),
  input: (styles: any) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
    color: contrast ? theme.blank : theme.text,
  }),
});

function Select<OptionType>({ undercover, contrast, width, ...props }: LunchyardSelectProps & SelectProps<OptionType>) {
  return (
    <ReactSelect
      classNamePrefix='reactSelect'
      styles={getStyles(undercover, width, contrast)}
      {...props}
    />
  );
};

export default Select;