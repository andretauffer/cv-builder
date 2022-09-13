import styled from "styled-components";

const Section = styled.section`
  /* box-shadow: -1px 4px 18px -3px rgba(0,0,0,0.75);
  -webkit-box-shadow: -1px 4px 18px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 4px 18px -3px rgba(0,0,0,0.75); */
  display: flex;
  flex-flow: column nowrap;
  background-color: #f5f2ed;
  background-color: var(--section-background);
`;

export default ({ children }) => {

  return <Section>{children}</Section>
};