import styled from "styled-components";
import { isMobile } from "react-device-detect";

const Page = styled.div`
  background-color: white;
  flex-grow: 1;
  margin: 0 auto;
  width: 80%;
`;

export default ({ children }) => {

  return <Page>{children}</Page>
};