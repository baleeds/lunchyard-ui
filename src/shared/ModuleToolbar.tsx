import React from 'react';
import styled from '@emotion/styled';
import theme from '../constants/theme';

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

const ButtonPrimary = styled.button`
  border-radius: 40px;
  min-width: 80px;
  color: ${theme.blank};
  background-color: ${theme.secondary};
  padding: 6px 15px;

  svg {
    fill: currentColor;
    margin-right: 10px;
  }
`;

export default ModuleToolbar;
