import { describe, it } from "vitest";
import { parseDate, parseDescription, filterTechnologies, parseFilterTerms } from "./utils";

describe("the parseDate function", () => {
  it("should correctly parse string into format to display", () => {

    const date = "01 June 2020";

    const parsedDate = parseDate({ date });
    expect(parsedDate).toEqual("1 jun 2020");
  });

  it("should correctly parse string into format to display in format MM/DD/YYYY", () => {

    const date = "06/01/2020";

    const parsedDate = parseDate({ date });
    expect(parsedDate).toEqual("1 jun 2020");
  });

  it("should accept the word 'current' in any capitalization format", () => {

    expect(parseDate({ date: "Current" })).toEqual("Current");
    expect(parseDate({ date: "current" })).toEqual("current");
    expect(parseDate({ date: "cUrrenT" })).toEqual("cUrrenT");
  });
});

describe("the parseDescription function", () => {
  it("should split a description paragraph into an array of strings separated by the . and space", () => {
    const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a cursus diam, et aliquam metus. Donec sagittis lacus at rutrum euismod. Maecenas aliquet leo eu nisl porta, eget porttitor tortor lobortis. Praesent facilisis magna id interdum gravida.`;

    const parsed = parseDescription({ description });

    expect(parsed.length).toEqual(5);
  });
});

describe("the filterTechnologies function", () => {
  const technologies = [
    {
      title: "JavaScript",
      keywords: [
        "Frontend"
      ]
    },
    {
      title: "ReactJS",
      keywords: [
        "Frontend"
      ]
    },
    {
      title: "NodeJS",
      keywords: [
        "Backend"
      ]
    }
  ];

  it("should filter the technologies array based on a string filter that matches a title", () => {
    const filter = "JavaScript";

    const filtered = filterTechnologies({ technologies, filter });
    expect(filtered).toEqual([
      technologies[0]
    ])
  });

  it("should filter the technologies array based on a string filter that matches a keyword", () => {
    const filter = "Frontend";

    const filtered = filterTechnologies({ technologies, filter });

    expect(filtered).toEqual([
      technologies[0],
      technologies[1]
    ])
  });

  it("should filter the technologies array based on a string filter with comas", () => {
    const filter = "javascript, reactjs";

    const filtered = filterTechnologies({ technologies, filter });

    expect(filtered).toEqual([
      technologies[0],
      technologies[1]
    ])
  });

  it("should filter the technologies array based on a string filter with comas removing empty arguments", () => {
    const filter = "javascript, reactjs, ";

    const filtered = filterTechnologies({ technologies, filter });

    expect(filtered).toEqual([
      technologies[0],
      technologies[1]
    ])
  });
});

describe("the parseFilterTerms function", () => {
  it("should split filter string in commas and remove spaces", () => {
    const filter = "some, filter, with spaces, between words";

    const parsed = parseFilterTerms({ filter });

    expect(parsed).toEqual([
      "some",
      "filter",
      "with spaces",
      "between words"
    ])
  });
});