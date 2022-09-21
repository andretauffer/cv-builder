import styled from "styled-components";

import Page from "./components/Page";
import Title from "./components/Title";
import Section from "./components/Section";

// import content from "./content.json";
import content from "./content2.json";
import { ContentContainer } from "./components/StyledComponents";
import Technologies from "./components/Technologies";
import Experiences from "./components/Experiences";
import { Resolver } from "@stoplight/json-ref-resolver";

import { initialState, Context, reducer } from "./Context"

import { useEffect, useState, useReducer, useRef } from "react";

const resolver = new Resolver();

const ViewContainer = styled.div`
  background-color: var(--light-sky-blue);
  width: 100vw;
  padding: 40px 0;
  @media print {
    padding: 0;
  }

`;

const ActionIcons = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: 50px 50px;
  width: 50px;
  height: 50px;
  position: sticky;
  float: right;
  top: 50px;
  right: 50px;
  @media print {
    display:none;
  }
`;

const Image = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: 200px 200px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  margin: 20px;
  min-width: 200px;

`;


const LinkTitle = styled.p`
  all: unset;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const Link = styled.a`
  color: var(--links-color);
  font-weight: bold;
  text-decoration: none;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 20px;
  background-color: var(--celadon);
  padding: 20px;
  border-radius: 20px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--border-animation-color);
  color: white;
  font-weight: bold;
  padding: 20px;
  border-radius: 20px;
  margin: 20px;
`;

const Description = styled.p`
  all: unset;
  margin: 10px 20px;
`;



const contentBox = ({ content, type, path }) => {

  const picker = {
    description: (description) => <DescriptionContainer>{description.map(paragraph => <Description>{paragraph}</Description>)}</DescriptionContainer>,
    links: (links) => <LinksContainer>
      <LinkTitle>Links:</LinkTitle>
      {links.map(({ href, title }) =>
        <Link href={href}>{title}</Link>
      )}
    </LinksContainer>,
    title: (text) => <Title sectionType={type} >{text}</Title>,
    subtitle: (text) => <Title sectionType={type} >{text}</Title>,
    "technology-title": (text) => <Title className="technology-title" sectionType={"technologies"} >{text}</Title>,
    "content-box": (content) => contentBox({ content }),
    "content-boxes": (boxes) => boxes.map(content => contentBox({ content })),
    image: ({ url }) => <Image url={url} />,
    technologies: (technologies) => <Technologies {...{ technologies }} />,
    experiences: (experiences) => <Experiences {...{ experiences, path }} />,
    education: (education) => <Experiences {...{ education, path }} />,
    default: () => <Description>Please specify a content box for type <strong>{type}</strong></Description>
  };

  return picker[type] ? picker[type](content) : picker.default()
};

const sectionParser = ({ section, type }) => {
  const { title, subtitle, description, image, links, technologies, assignments, courses } = section;
  const sectionTypes = {
    intro: () => <Section key={"intro" + title}>
      <ContentContainer>
        <ContentContainer direction="column nowrap">

          {contentBox({ content: title, type: "title" })}
          {contentBox({ content: subtitle, type: "subtitle" })}
          {contentBox({ content: description, type: "description" })}
        </ContentContainer>
        <ContentContainer direction="column nowrap">
          {contentBox({ content: image, type: "image" })}
          {contentBox({ content: links, type: "links" })}
        </ContentContainer>
      </ContentContainer>
    </Section>,
    technologies: () => <><Section key={type + title} backgroundColor={"#f5f2ed"} stick={true}>
      {contentBox({ content: title, type: "technology-title" })}
    </Section>
      {contentBox({ content: technologies, type: "technologies" })}
    </>,
    experiences: () => <Section key={type + title}>
      {contentBox({ content: title, type: "technology-title" })}
      {contentBox({ content: assignments, type: "experiences", path: type + "/" })}
    </Section>,
    education: () => <Section key={type + title}>
      {contentBox({ content: title, type: "technology-title" })}
      {contentBox({ content: courses, type: "experiences", path: type + "/" })}
    </Section>
  };

  return sectionTypes[type] ? sectionTypes[type]() : <></>;
}

function App() {

  const [resolvedContent, setContent] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    resolver.resolve(content).then(resolved => setContent(resolved.result))
  }, []);

  const onPrint = () => {
    window.print();
  }

  return (<>
    <Context.Provider value={{
      ...state,
      dispatch
    }}>
      <ActionIcons onClick={onPrint} url="/src/assets/printer-svgrepo-com.svg" />

      {resolvedContent ?
        <ViewContainer className="view-container">
          <Page >
            {Object.keys(resolvedContent).map(section =>
              sectionParser({
                section: resolvedContent[section],
                type: section
              }))}
          </Page>
        </ViewContainer>
        : <></>}
    </Context.Provider>
  </>
  )
}

export default App
