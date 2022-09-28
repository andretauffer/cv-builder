
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dev"];

export const parseDate = ({ date }) => {
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

export const parseDescription = ({ description }) => description
  .split(/\.\s/)
  .filter(e => !!e)
  .map(string => !string.endsWith(".") ? string + ". " : string);

export const parseFilterTerms = ({ filter }) => filter.split(/,/g).filter(e => !!e.trim()).map(term => term.trim());

export const filterTechnologies = ({ technologies, filter, keywords }) => {

  let filterTerms = [];

  if (filter) filterTerms = parseFilterTerms({ filter });

  if (keywords && keywords.length) filterTerms = [...filterTerms, ...keywords];

  if (!filterTerms.length) return technologies;

  return technologies
    .filter(({ title, keywords }) => {

      let matchingTerms = [title];
      if (keywords && keywords.length) matchingTerms = [...matchingTerms, ...keywords]

      return filterTerms.reduce((prev, curr) => {
        const match = matchingTerms.reduce((mprev, mcurr) => mcurr.toLowerCase() === curr.toLowerCase() ? true : mprev, false);

        return match ? true : prev;
      }, false);
    });
};
