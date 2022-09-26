import styled from "styled-components";
import { Context } from "../Context";
import { useContext } from "react";

const Section = styled.section`
  display: flex;
  flex-flow: column nowrap;
  box-shadow: -3px 2px 7px 0px #00000038;
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
`;

export default ({ children }) => {

  const { dispatch } = useContext(Context);

  return <Section onClick={() => dispatch({ type: "UNSELECT" })}>{children}</Section>
};