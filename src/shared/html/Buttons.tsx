import styled from "@emotion/styled";
import theme from "../../constants/theme";

export const Button = styled.button`
  outline: ${theme.primary};
`;

export const BasicButton = styled(Button)`
  padding: 6px 15px;
  border-radius: 100px;
  min-width: 80px;
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    margin-right: 10px;
  }
`;

export const ButtonPrimary = styled(BasicButton)`
  color: ${theme.blank};
  background-color: ${theme.secondary};
`;

export const ButtonGhost = styled(BasicButton)`
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, .05);
  }
`;