import styled from "styled-components";
import { Context } from "../Context";
import { useContext } from "react";

const Section = styled.section`
  display: flex;
  flex-flow: column nowrap;

  ${props => props.stick && `
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: var(--lavender-blush);
    
  `}
`;

export default ({ children }) => {

  const { dispatch } = useContext(Context);

  return <Section onClick={() => dispatch({ type: "UNSELECT" })}>{children}</Section>
};