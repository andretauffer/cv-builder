import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { breakPoint1 } from "../ViewConfigurations";



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
  ${isMobile && `
    order: 2;
    font-size: 18px;
    padding: 5px 0;
  `}
  @media only screen and (min-width: ${breakPoint1}) {
    order: 2;
    font-size: 24px;
    padding: 5px 0;
  }
  @media print {
  }
`;

const Subtitle = styled(Title)`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-indent: 20px;
  margin-bottom: 20px;
  ${isMobile && `
    order: 3;
    font-size: 14px;
    padding: 0;
  `}
  @media only screen and (min-width: ${breakPoint1}) {
    order: 3;
    font-size: 14px;
    padding: 0;
  }
  @media print {
  }
`;

const Technologies = styled(Title)`
  font-size: 24px;
  text-indent: 20px;
  margin: 20px 0;
  ${isMobile && `
    font-size: 16px;
    `}
  @media print {
    font-size: 16px;
    color: black;
    margin: 10px 0;
  }
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