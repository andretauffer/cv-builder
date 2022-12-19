import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { breakPoint1, breakPoint2 } from "../ViewConfigurations";

export const ContentContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  ${props => props.direction && `
    flex-flow: ${props.direction}
  `}
  @media only screen and (max-width: ${breakPoint1}) {
    max-height: 500px;
  }
  @media only screen and (max-width: ${breakPoint2}) {
    max-height: none;
  }
  ${isMobile && `
    max-height: none;
    flex-flow: row wrap;
    justify-content: flex-start;
  `}
  @media print {
    width: 100%;
    max-height: 500px;
    justify-content: flex-start;
  }

`;