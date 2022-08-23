import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  ${props => props.direction && `
    flex-flow: ${props.direction}
  `}

`;