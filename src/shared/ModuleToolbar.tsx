import React from 'react';
import styled from '@emotion/styled';
import theme from '../constants/theme';
import { ButtonPrimary } from './html/Buttons';

interface Props {
  title: string,
  subTitle?: string,
  button?: {
    title: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    Icon?: any,
  },
};

const ModuleToolbar: React.FC<Props> = ({
  title,
  subTitle,
  button: {
    title: buttonTitle,
    onClick,
    Icon,
  } = {},
}) => {
  return (
    <div>
      <TaskbarContainer>
        <div>
          <h2>
            {title}
            {subTitle && <small>{subTitle}</small>}
          </h2>
        </div>
        <div>
          {buttonTitle && (
            <ButtonPrimary
              type="button"
              onClick={onClick}
            >
              {Icon && <Icon width="12" />}
              {buttonTitle}
            </ButtonPrimary>
          )}
        </div>
      </TaskbarContainer>
    </div>
  );
};

const TaskbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid ${theme.border};

  h2 {
    font-size: 24px;
    color: ${theme.text};

    small {
      font-size: .8em;
      color: ${theme.textLight};
      margin: 0 20px;
    }
  }
`;

export default ModuleToolbar;
