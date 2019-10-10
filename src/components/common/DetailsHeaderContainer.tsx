import styled from "@emotion/styled";
import { theme } from "../../constants/theme";

export const DetailsHeaderContainer = styled.div`
  background-color: ${theme.primary};
  color: ${theme.blank};
  padding: 30px;

  h2 {
    margin-top: 20px;
  }

  input {
    width: 100%;
    padding: 9px 15px;
    background-color: transparent;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    color: ${theme.blank};
    font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif;    

    ::placeholder {
      color: rgba(255,255,255,.7);
    }

    &:focus {
      background-color: rgba(0,0,0,.2);
    }
  }

  .DayPickerInput {
    color: ${theme.text};
  }

  .title {
    color: ${theme.blank};
    font-size: 32px;
    font-weight: bold;
  }
`;