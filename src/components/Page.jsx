import styled from "styled-components";
import { isMobile } from "react-device-detect";

const Page = styled.div`
  background-color: white;
  margin: 40px auto;
  flex-grow: 1;
`;

export default ({ children }) => {

  return <Page>{children}</Page>
};