import styled from "@emotion/styled";
import { theme } from "../../constants/theme";

export const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-right: 1px solid ${theme.border};
  /* max-width: 500px; */
`;
