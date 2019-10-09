import React from 'react';
import styled from '@emotion/styled';
import theme from '../../constants/theme';

interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  message?: string;
};

const Placeholder: React.FC<Props> = ({
  Icon,
  message,
}) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Icon />
        {message && <span>{message}</span>}
      </InnerContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: .6;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.textLight};
  font-weight: bold;
  
  svg {
    width: 100px;
    height: auto;
    fill: currentColor;
  }
`;

export default Placeholder;