import styled from "styled-components";

import Page from "./components/Page";
import Title from "./components/Title";
import Section from "./components/Section";

// import content from "./content.json";
import content from "./content2.json";
import { ContentContainer } from "./components/StyledComponents";
import Technologies from "./components/Technologies";

const ViewContainer = styled.div`
  background-color: grey;
  width: 100vw;
  padding: 40px 0;

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

const Link = styled.a``;

const LinksContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 20px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Description = styled.p`
  all: unset;
  color: black;
  margin: 10px 20px;
`;



const contentBox = ({ content, type }) => {

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
    "technology-title": (text) => <Title sectionType={"technologies"} >{text}</Title>,
    "content-box": (content) => contentBox({ content }),
    "content-boxes": (boxes) => boxes.map(content => contentBox({ content })),
    image: ({ url }) => <Image url={url} />,
    technologies: (technologies) => <Technologies {...{ technologies }} />,
    default: () => <Description>Please specify a content box for type <strong>{type}</strong></Description>
  };

  return picker[type] ? picker[type](content) : picker.default()
};

const sectionParser = ({ section, type }) => {
  const { title, subtitle, description, image, links, technologies } = section;
  const sectionTypes = {
    intro: () => <Section>
      <ContentContainer>
        <ContentContainer direction="column nowrap">

          {contentBox({ content: title, type: "title" })}
          {contentBox({ content: subtitle, type: "subtitle" })}
          {contentBox({ content: description, type: "description" })}
          {contentBox({ content: links, type: "links" })}
        </ContentContainer>
        {contentBox({ content: image, type: "image" })}
      </ContentContainer>
    </Section>,
    technologies: () => <Section backgroundColor={"#f5f2ed"}>
      {contentBox({ content: title, type: "technology-title" })}
      {contentBox({ content: technologies, type: "technologies" })}
    </Section>
  };

  return sectionTypes[type] ? sectionTypes[type]() : <Description>Please specify a section for the type <strong>{type}</strong></Description>
}

const LightRay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(20%, -50%) rotate(20deg);
  height: 120vh;
  width: 0px;
  /* background: linear-gradient(90deg, rgba(245,245,245,0.2) 0%, rgba(245,245,245,1) 20%, rgba(245,245,245,1) 80%, rgba(245,245,245,0.9) 100%); */
  background: rgba(245,245,245,0.6);
  box-shadow: 0px 0px 22px 5px white;
  mix-blend-mode: soft-light;

  animation: shine 10s ease-in-out infinite;

  @keyframes shine {
    0%{
      box-shadow: 0px 0px 10px 5px white;

    }
    50%{
      box-shadow: 0px 0px 22px 1px white;
      width: 0px;

    }
    100%{

      box-shadow: 0px 0px 10px 5px white;
    }
  }
`;

function App() {

  return (<>
    {/* <LightRay></LightRay> */}
    <ViewContainer>
      <Page>
        {Object.keys(content).map(section => sectionParser({ section: content[section], type: section }))}
      </Page>
    </ViewContainer>
  </>
  )
}

export default App
