import styled from "styled-components";
import { Context } from "../Context";
import { useContext } from "react";

const Section = styled.section`
  display: flex;
  flex-flow: column nowrap;
  box-shadow: -3px 3px 10px 0px #0000002e;
  /* margin: 10px 0; */
  margin: 10px;
  /* background-color: var(--lavender-blush); */

  ${props => props.stick && `
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: transparent;
    // background-color: var(--lavender-blush);
  `}
  ${props => props.sectionType === "projects" && `
      box-shadow: none;
      // margin-top: 30vh;
      @media print {
        display: none;
      }
  `}
  @media print {
    width: 100vw;
    box-shadow: none;
    margin: 0 auto;
    padding: 20px;
    ${props => props.sectionType === "technologies" && `
      // width: 300px;
    `}
    /* border-top: 5px solid var(--light-sky-blue); */
  }
`;

export default ({ children, sectionType }) => {

  const { dispatch } = useContext(Context);

  return <Section onClick={() => dispatch({ type: "UNSELECT" })} {...{ sectionType }}>{children}</Section>
};