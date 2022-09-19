import { useEffect, useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dev"];

const BlockContainer = styled.div`
  padding: 0px 0px 20px;
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
  transition: 1s ease all;
  ${props => props.selected ? `
    // animation: AnimationName 5s linear infinite;
    // background: radial-gradient(circle, var(--border-animation-color), transparent, transparent, transparent, transparent, transparent);
    // background-size: 200% 200%;
    background-color: var(--border-animation-color);
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
  flex-flow: row wrap;
`;

const Keyword = styled.p`
  all: initial;
  font-weight: normal;
  color: black;
  padding-left: 10px;
  background: var(--celadon);
  padding: 6px;
  border-radius: 5px;
  margin: 3px;
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

export default ({ experiences, path }) => {

  const { selected, dispatch } = useContext(Context);

  useEffect(() => {
    const containers = document.querySelectorAll("section");
    const unset = () => {

      dispatch({ type: "SET_SELECTED", selected: undefined });
    };

    containers.forEach(section => section.addEventListener("onclick", unset));

    return () => containers.forEach(section => section.removeEventListener("onclick", unset));
  }, [])

  return <BlockContainer onClick={() => dispatch({ type: "SET_SELECTED", selected: undefined })}>


    {experiences.map(({ title, institution, period, description, keywords }, index) =>
      <ExperienceContainer
        key={title + index}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "SET_SELECTED", selected: path + index });
          dispatch({ type: "SET_KEYWORDS", keywords });
        }}
        onBlur={() => dispatch({ type: "SET_SELECTED", selected: undefined })}>
        <ExperienceContainerBorder {...{ selected: selected === path + index }} />
        <ExperienceContent {...{ selected: selected === path + index }}>

          <JobTitle>{title} at {institution.name}</JobTitle>
          <PeriodContainer>
            <DateParagraph>{parseDate({ date: period.from })}</DateParagraph>
            <DateParagraph>
              -
            </DateParagraph>
            <DateParagraph>{parseDate({ date: period.to })}</DateParagraph>
          </PeriodContainer>
          <JobDescription>
            {parseDescription({ description: description })
              .map((paragraph, index) =>
                <JobDescriptionParagraph key={paragraph[0] + paragraph[paragraph.length - 1] + index}>
                  {paragraph}
                </JobDescriptionParagraph>
              )}
          </JobDescription>
          <KeyWordsContainer>

            Keywords:

            {keywords.map((keyword, index) =>
              <Keyword>{keyword}</Keyword>
            )}
          </KeyWordsContainer>
        </ExperienceContent>
      </ExperienceContainer>
    )
    }

  </BlockContainer >
};