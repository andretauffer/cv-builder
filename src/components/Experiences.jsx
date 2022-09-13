import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dev"];

const BlockContainer = styled.div`
  padding: 40px 0px;
  margin: 0 20px;
  

`;
const ExperienceContainerBorder = styled.div`
  position: absolute;
  top: -5px;
  bottom: -5px;
  left: -5px;
  right: -5px;
  z-index: 0;
  border-radius: 25px;
  ${props => props.selected ? `
    animation: AnimationName 5s linear infinite;
    background: radial-gradient(circle, var(--border-animation-color), var(--section-background), var(--section-background), var(--section-background), var(--section-background), var(--section-background));
    background-size: 200% 200%;

    `: `
    background-color: transparent;
  `}
  @keyframes AnimationName {
    0%{background-position:100% 100%}
    25%{background-position:0% 100% }
    50%{background-position:0% 0%}
    75%{background-position:100% 0%}
    100%{background-position:100% 100%}
}



`;

const ExperienceContainer = styled.div`
  
  position: relative;
`;

const ExperienceContent = styled.div`
  background-color: white;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  z-index: 1;
  position: relative;
`;

const JobTitle = styled.p`
  all: unset;
  color: black;
  font-size: 18px;

`;

const PeriodContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  color: black;
  justify-content: flex-start;
  * {
  }
  `;
const DateParagraph = styled.p`
  all: initial;
  padding-right: 10px;
  font-weight: bold;
  
`;

const JobDescription = styled.div`
  margin-top: 20px;
`;

const JobDescriptionParagraph = styled.p`
  all: initial;
  color: black;
`;

const KeyWordsContainer = styled.div`
  display: flex;
  color: black;
  font-weight: bold;
  align-items: center;
`;

const Keyword = styled.p`
  all: initial;
  font-weight: normal;
  color: black;
  padding-left: 10px;
`;

const parseDate = ({ date }) => {
  if (date.toLowerCase() === "current") {
    return date;
  } else if (date) {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`
  }
};

const parseDescription = ({ description }) => description
  .split(/\.\s/)
  .filter(e => !!e)
  .map(string => !string.endsWith(".") ? string + ". " : string);

export default ({ experiences }) => {


  const [selected, setSelected] = useState();

  useEffect(() => {
    const containers = document.querySelectorAll("section");
    const unset = () => {
      console.log("gets invoked", containers)
      setSelected(undefined)
    };

    containers.forEach(section => section.addEventListener("onclick", unset));

    return () => containers.forEach(section => section.removeEventListener("onclick", unset));
  }, [])

  return <BlockContainer onClick={() => setSelected(undefined)}>


    {experiences.map(({ jobTitle, company, period, jobDescription, keywords }, index) =>
      <ExperienceContainer
        key={jobTitle + index}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(index)
        }} onBlur={() => setSelected()}>
        <ExperienceContainerBorder {...{ selected: selected === index }} />
        <ExperienceContent>

          <JobTitle>{jobTitle} at {company.name}</JobTitle>
          <PeriodContainer>
            <DateParagraph>{parseDate({ date: period.from })}</DateParagraph>
            <DateParagraph>
              -
            </DateParagraph>
            <DateParagraph>{parseDate({ date: period.to })}</DateParagraph>
          </PeriodContainer>
          <JobDescription>
            {parseDescription({ description: jobDescription })
              .map((paragraph, index) =>
                <JobDescriptionParagraph key={paragraph[0] + paragraph[paragraph.length - 1] + index}>
                  {paragraph}
                </JobDescriptionParagraph>
              )}
          </JobDescription>
          <KeyWordsContainer>

            Keywords:

            {keywords.map((keyword, index) =>
              <Keyword>{keyword} {index < keywords.length - 1 ? "," : ""}</Keyword>
            )}
          </KeyWordsContainer>
        </ExperienceContent>
      </ExperienceContainer>
    )}

  </BlockContainer>
};