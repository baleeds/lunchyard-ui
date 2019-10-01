import React, { Component } from 'react';
import styled from '@emotion/styled';

export const ICONS = Object.freeze({
  LOADING: 'M12,20.89A8.89,8.89,0,1,1,16.74,4.48.91.91,0,0,1,17,5.8h0a.87.87,0,0,1-1.14.2,7.08,7.08,0,0,0-3.89-1.11A7.11,7.11,0,0,0,12,19.11,7,7,0,0,0,15.83,18a.87.87,0,0,1,1.14.2h0a.91.91,0,0,1-.23,1.32A8.9,8.9,0,0,1,12,20.89Z',
});

interface IconProps {
  icon: string,
}

interface SvgProps {
  className: string,
  size?: number,
  style?: React.CSSProperties,
  color?: string,
  loading?: boolean,
}

type Props = IconProps & SvgProps;

const Icon: React.FC<Props> = (props) => {
  const {
    size = 20,
    color = 'currentColor',
    style,
    className,
    icon,
    loading,
  } = props;
    
  return (
    <IconSvg
      className={className}
      viewBox="0 0 24 24"
      style={{
        verticalAlign: 'middle',
        height: `${size}px`,
        width: `${size}px`,
        ...style,
      }}
    >
      {loading ? (
        <path d={ICONS.LOADING} style={{ fill: color, verticalAlign: 'middle' }} />
      ) : (
        <path d={icon} style={{ fill: color, verticalAlign: 'middle' }} />
      )}
    </IconSvg>
  );
};

const IconSvg = styled('svg')<SvgProps>`
  ${props => props.loading && 'animation: spin 800ms linear infinite;'}
`;

export default Icon;
