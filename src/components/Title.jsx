import styled from "styled-components";

const Title = styled.p`
  all: unset;
  color: var(--title-color);
  font-family: var(--header-font-family);
  font-size: 20px;
  font-weight: 500;

`;

const Main = styled(Title)`
  padding: 20px 0;
  text-indent: 20px;
  font-size: 32px;
  font-weight: 800;

`;

const Subtitle = styled(Title)`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-indent: 20px;
  margin-bottom: 20px;
`;

const Technologies = styled(Title)`
  font-size: 24px;
  text-indent: 20px;
  margin: 20px 0;
`;
const Experience = styled(Title)``;

export default ({ title = "Title", sectionType, children }) => {

  const titleComp = children ? children : title;

  const componentPicker = {
    title: () => <Main>{titleComp}</Main>,
    subtitle: () => <Subtitle>{titleComp}</Subtitle>,
    technologies: () => <Technologies>{titleComp}</Technologies>,
    experience: () => <Experience>{titleComp}</Experience>,
    default: () => <Title>{titleComp}</Title>
  };

  return componentPicker[sectionType] ? componentPicker[sectionType]() : componentPicker.default();
};