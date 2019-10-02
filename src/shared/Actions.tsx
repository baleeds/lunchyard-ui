import React from 'react';
import styled from '@emotion/styled';

interface Action {
  name: string,
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  onClick: any,
};

interface Props {
  style?: React.CSSProperties,
  actions: Action[],
};

const Actions: React.FC<Props> = ({
  actions,
  style,
}) => {
  return (
    <ActionContainer style={style}>
      {actions.map(({ name, Icon }) => {        
        return (
          <Button
            type="button"
            onClick={console.log}
          >
            {Icon && <Icon />}
            {name}
          </Button>
        )
      })}
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;

  button + button {
    margin-left: 20px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    width: 20px;
    height: auto;
    margin-right: 10px;
  }
`;

export default Actions;