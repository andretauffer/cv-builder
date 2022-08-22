import styled from "styled-components";

import Page from "./components/Page";
import Title from "./components/Title";
import Section from "./components/Section";

// import content from "./content.json";
import content from "./content2.json";

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

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  ${props => props.direction && `
    flex-flow: ${props.direction}
  `}

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

const TechTitle = styled.p`
  all: unset;
  color: black;
  font-size: 16px;
`;

const TechContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between ;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
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
    technologies: (technologies) => <TechContainer direction="row wrap">{technologies
      .map(({ title, url }) => <ContentContainer direction="column nowrap" style={{ alignItems: "center" }}>
        <Logo url={url}></Logo>
        <TechTitle>
          {title}
        </TechTitle>
      </ContentContainer>)}
    </TechContainer>,
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

function App() {

  return (
    <ViewContainer>
      <Page>
        {Object.keys(content).map(section => sectionParser({ section: content[section], type: section }))}
      </Page>
    </ViewContainer>
  )
}

export default App
