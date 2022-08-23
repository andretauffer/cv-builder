import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";



const BlockContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around ;
  margin: 20px;
  /* padding: 20px; */
  border-radius: 20px;
  background-color: white;
  position: relative;
`;

const TechContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: calc(100%/8);
  text-align: center;
  margin: 20px 0;
  /* white-space: ; */
`;

const Logo = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: contain;
  background-position: center;
  width: 80px;
  height: 80px;
  margin: 10px;
  min-width: 40px;

`;

const Loupe = styled.div`
  background-image: url("/src/assets/Magnifying_glass_icon.svg");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-color: white;
  background-position: 10px center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -20px;
  left: 0;
  border-radius: 40px ;
  box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  
  transition: 1s ease all;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  ${props => props.open && `
    width: 300px;
    background-position: 270px center;
    background-image: url("/src/assets/OOjs_UI_icon_close-ltr.svg");

  `}
`;

const StyledInput = styled.input`
  text-indent: 10px;
  font-size: 16px;
  color: black;
  background-color: white;
  border: none;
  margin: 0px 10px;
  width: calc(100% - 50px);

  ${props => !props.show && `
    display: none;
  `}

`;

const TechsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around ;
  /* margin: 20px; */
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  height: 240px;
  overflow: auto;
`;

export default ({ technologies }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState("");

  return <BlockContainer>
    <Loupe onClick={() => {
      setOpenFilter(!openFilter)
      setFilter("");
    }} open={openFilter}>
      {openFilter && <StyledInput
        show={openFilter}
        autoFocus={true}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onChange={e => {
          e.stopPropagation();
          setFilter(e.target.value)
        }} value={filter}></StyledInput>}
    </Loupe>
    <TechsContainer>

      {technologies
        .map(({ title, url }) => <TechContainer key={title} direction="column nowrap" style={{ alignItems: "center" }}>
          <Tooltip content={title} >
            <Logo url={url}></Logo>
          </Tooltip>
        </TechContainer>)}
    </TechsContainer>
  </BlockContainer >;
}