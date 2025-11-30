import { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

import { Context } from "../Context";
import { filterTechnologies } from "./utils";
import { breakPoint1 } from "../ViewConfigurations";
import { isMobile } from "react-device-detect";

const BlockContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 20px;
  border-radius: 20px;
  background-color: transparent;
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
  width: clamp(calc(100% / 12), 8%, calc(100% / 8));
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
  ${isMobile &&
  `
    width: clamp(40px, 5%, 60px);
    margin: clamp(5px, 2%, 20px);
  
  `}

  @media print {
    width: fit-content;
    margin: 5px;
    /* height: fit-content; */
    /* max-height: 60px;
    margin: 0 20px;
    font-size: 10px;
    flex-flow: row nowrap;
    justify-content: flex-start; */
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
    text-indent: 0;
  }
`;

const Logo = styled.div`
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: contain;
  background-position: center;
  width: 100%;
  min-height: 60px;
  @media print {
    display: none;
    min-height: 0;
  }
`;

const TechsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  background-color: white;
  height: 280px;
  overflow: auto;
  width: 100%;
  transition: 1s all ease;
  @media only screen and (min-width: ${breakPoint1}) {
    height: auto;
  }
  ${isMobile &&
  `
    height: auto;
  
  `}
  @media print {
    height: auto;
    margin: 0 auto 0 0;
    flex-flow: column nowrap;
    max-height: 220px;
    max-width: 100%;
    gap: 0px;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid grey;
    padding: 20px;
    position: absolute;
    max-width: fit-content;
    right: 20px;
    top: 70px;
    max-height: fit-content;
  }
`;

export default ({ technologies }) => {
  const container = useRef(null);

  const { keywords } = useContext(Context);

  return (
    <BlockContainer ref={container}>
      <TechsContainer className="techs-container">
        {filterTechnologies({ technologies, keywords }).map(
          ({ title, url }) => (
            <TechContainer
              className="tech-box"
              key={title}
              direction="column nowrap"
              style={{ alignItems: "center" }}
            >
              <Tooltip content={title}>
                <Logo url={url}></Logo>
              </Tooltip>
              <TechTitle>{title}</TechTitle>
            </TechContainer>
          )
        )}
      </TechsContainer>
    </BlockContainer>
  );
};
