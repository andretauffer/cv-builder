import styled from "styled-components";

const Title = styled.p`

`;

const Main = styled(Title)``;

const Experience = styled(Title)``;

export default ({ title, sectionType }) => {

  const componentPicker = {
    main: () => <Main>{title}</Main>,
    experience: () => <Experience>{title}</Experience>,
    default: () => <Title>{title}</Title>
  };

  return componentPicker[sectionType] ? componentPicker[sectionType]() : componentPicker.default();
};