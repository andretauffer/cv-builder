import styled from "styled-components";
import { Context } from "../Context";
import { useContext } from "react";

const Section = styled.section`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  box-shadow: -3px 3px 10px 0px #0000002e;
  margin: 10px;

  ${props => props.stick && `
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: transparent;
    // background-color: var(--lavender-blush);
  `}
  ${props => props.sectionType === "projects" && `
      box-shadow: none;
      @media print {
        display: none;
      }
      `}
  @media print {
    width: 95vw;
    box-shadow: none;
    margin: 0;
    padding: 0 20px;
    margin: 0;
      ${props => props.sectionType === "intro" && `
          width: 100vw;
            `
          }
  }
`;

export default ({ children, sectionType }) => {

  const { dispatch } = useContext(Context);

  return <Section onClick={() => dispatch({ type: "UNSELECT" })} {...{ sectionType }}>{children}</Section>
};