import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { breakPoint1 } from "../ViewConfigurations";

const Page = styled.div`
  /* background-color: var(--section-background); */
  flex-grow: 1;
  margin: 0 auto;
  width: 80%;
  padding: 20px;

  ${props => props.pageLayout === "basic" && `
    display: flex;
    flex-flow: row wrap;
    @media only screen and (min-width: ${breakPoint1}) {
    padding: 0;
  }
  `}
  ${isMobile && `
    width: 100%;
    padding: 0;
  `}
`;

export default ({ children, pageLayout }) => {

  return <Page {...{ pageLayout }}>{children}</Page>
};