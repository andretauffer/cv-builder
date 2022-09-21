import { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

import { Context } from "../Context"
import { filterTechnologies } from "./utils";

const BlockContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around ;
  margin: 20px;
  border-radius: 20px;
  background-color: transparent;
  position: relative;
  position: sticky;
  top: -200px;;
  z-index: 10;
  &.is-pinned{
    background-color: red;
    .loupe{
      display: none;
    }
    .techs-container{
      height: 80px;
      padding-top: 220px;
      background-color: var(--lavender-blush);
      border-radius: 0;
    }
    .tech-box {
      flex-grow: 1;
      width: auto;
    }
  }
`;

const TechContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: calc(100%/12);
  text-align: center;
  margin: 20px 0;
  transition: 1s ease all;
`;

const Logo = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: contain;
  background-position: center;
  width: 100%;
  min-height: 60px;
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
  z-index: 1;
  top: -20px;
  left: 0;
  border-radius: 40px ;
  box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  
  transition: 1s ease all, background-color 0.2s ease;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  :active {
    background-color: #c8e8c8;
  }
  
  ${props => props.open && `
    width: 300px;
    background-position: 270px center;
    background-image: url("/src/assets/OOjs_UI_icon_close-ltr.svg");

  `}

  @media print {
    display:none;
  }
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
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  height: 280px;
  overflow: auto;
  position: sticky;
  width: 100%;
  transition:1s all ease;
`;

export default ({ technologies, ...more }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState("");

  const container = useRef(null);

  const { keywords, ...rest } = useContext(Context);

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle("is-pinned", e.intersectionRatio < 1);
      },
      options
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => {
      if (container.current) observer.unobserve(container.current);
    }
  },
    [container, options])

  return <BlockContainer ref={container}>
    <Loupe
      className="loupe"
      onClick={() => {
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
    <TechsContainer className="techs-container">

      {filterTechnologies({ technologies, filter, keywords })
        .map(({ title, url }) => <TechContainer className="tech-box" key={title} direction="column nowrap" style={{ alignItems: "center" }}>
          <Tooltip content={title} >
            <Logo url={url}></Logo>
          </Tooltip>
        </TechContainer>)}
    </TechsContainer>
  </BlockContainer >;
}