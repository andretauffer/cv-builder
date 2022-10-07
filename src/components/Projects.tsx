import { useEffect, useMemo, useRef } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { Projects } from "../types/projects";


interface ProjectsArgs extends Projects {
};

const CardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: fit-content;
  /* margin: 200px auto; */
  /* background-color: var(--celadon); */
  width: auto;
  padding: 40px 2vw;
  justify-content: center;
  border-radius: 40px;
  /* width: fit-content; */
 ${isMobile && `
    padding: 10px;
    width: fit-content;
    margin: 0;
    background-color: transparent;
    padding-bottom: 40px

 `}
  @media print {
    display: none;
  }
`;

const LinkOverlay = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ProjectCard = styled.div`
  box-shadow: -3px 3px 10px 0px #0000002e;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: fit-content;
  /* margin: clamp(20px, 10vw, 300px) 20px; */
  color: black;
  padding: 5px;
  background-color: white;
  margin: 40px 20px;
  ${isMobile && `
    max-width: 90vw;
    margin: 20px auto;
  `}

  transform: translateY(50px);  
  opacity: 0;
  transition: 1s ease opacity, 1s ease transform;
  &.is-shown {
    transform: none;
    opacity: 1;
  }
`;
const TextColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 20px;
  width: 300px;
  ${isMobile && `
    width: auto;
  `}
`;
const ProjectTitle = styled.h2`
  margin: 10px 0;
  font-family: var(--header-font-family);
  ${isMobile && `
    font-size: 15px;
    margin: 5px 0;
  `}
`;
const ProjectDescription = styled.p`
  margin: 10px 0;
  font-family: var(--noto-font-family);
  font-size: 18px;
  ${isMobile && `
    font-size: 12px;
    margin: 0;
  `}
`;

interface ImageProps {
  url: string | undefined;
}
const ProjectImage = styled.div<ImageProps>`
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: 100%;
  object-fit: cover;
  height: 100%;
  aspect-ratio: 1/1;
`;

const AppearingCard = ({ children }) => {

  const container: any = useRef(null);
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle("is-shown", e.intersectionRatio === 1);
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
  return <ProjectCard ref={container} >{children}</ProjectCard>
}



export default ({ projects }: ProjectsArgs) => {

  return <CardsContainer>
    {projects && projects.map(({ title, description, url, image }) =>
      <AppearingCard>
        <LinkOverlay target="blank_" href={url} />
        <ProjectImage url={image}></ProjectImage>
        <TextColumn>

          <ProjectTitle>{title}</ProjectTitle>
          <ProjectDescription>{description}</ProjectDescription>
        </TextColumn>
      </AppearingCard>
    )}
  </CardsContainer>
}