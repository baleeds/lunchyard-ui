import React from 'react';
import styled from '@emotion/styled';
import { ButtonGhost } from './html/Buttons';

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

const Button = styled(ButtonGhost)`
  color: white;
  display: flex;
  align-items: center;
  font-style: italic;
  font-size: 20px;

  svg {
    fill: currentColor;
    width: 20px;
    height: auto;
  }
`;

export default Actions;