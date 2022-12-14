import { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

import { Context } from "../Context"
import { filterTechnologies } from "./utils";
import { breakPoint1 } from "../ViewConfigurations";
import { isMobile } from "react-device-detect";

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
    @media only screen and (max-width: ${breakPoint1}) {

      ${!isMobile && `
        
        background-color: red;
        .loupe{
          display: none;
        }
        .techs-container{
          height: 80px;
          top: 0;
          width: 80%;
          // width: calc(80% - 60px);
          border: 10px solid var(--celadon);

          border-radius: 0;
          position: fixed;
        }
        .tech-box {
          flex-grow: 1;
          width: auto;
          margin: 2px;
        }
        `}
    }
  }
  @media print {
    height: auto;
    margin: 0;
    padding: 0;
    /* justify-content: ; */
  }
`;

const TechContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: black;
  justify-content: flex-start;
  width: clamp(calc(100%/12), 8%, calc(100%/8));
  text-align: center;
  /* margin: 20px auto; */
  transition: 1s ease all;
  margin: clamp(5px, 5%, 15px);
  margin-top: 10px;
  @media only screen and (min-width: ${breakPoint1}) {
    width: clamp(40px, 5%, 60px);
    margin: clamp(5px, 5%, 10px);
    margin-top: 10px;
  }
  ${isMobile && `
    width: clamp(40px, 5%, 60px);
    margin: clamp(5px, 2%, 20px);
  
  `}

  @media print {
    width: fit-content;
    max-height: 60px;
    margin:  0 20px ;
    font-size: 10px;
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
`;

const TechTitle = styled.p`
  white-space: nowrap;
  margin: 0;
  text-align: start;
  text-indent: 0;
  align-self: flex-start;
  padding: 0;
  text-indent: 5px;
  display: none;
  @media print {
    display: block;
  }
`;

const Logo = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: contain;
  background-position: center;
  width: 100%;
  min-height: 60px;
  @media print {
    height: 100%;
    max-height: 20px;
    width: 20px;
    min-height: auto;
    aspect-ratio: 1/1;
    
  }
`;

const Loupe = styled.div`
  background-image: url("Magnifying_glass_icon.svg");
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
    background-image: url("OOjs_UI_icon_close-ltr.svg");

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
  /* justify-content: space-around; */
  justify-content: flex-start;
  align-items: center;
  /* padding: 20px; */
  border-radius: 20px;
  background-color: white;
  height: 280px;
  overflow: auto;
  position: sticky;
  width: 100%;
  transition:1s all ease;
  @media only screen and (min-width: ${breakPoint1}) {
    height: auto;
  }
  ${isMobile && `
    height: auto;
  
  `}
  @media print {
    height: auto;
    margin: 0 auto 0 20px;
    flex-flow: column wrap;
    max-height: 220px;
    justify-content: flex-start;
    align-items: flex-start;
    width: 450px;
  }
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
          <TechTitle>
            {title}
          </TechTitle>
        </TechContainer>)}
    </TechsContainer>
  </BlockContainer >;
}