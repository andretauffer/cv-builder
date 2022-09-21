import React from 'react';
// import '@testing-library/jest-dom/extend-expect'
import * as stories from "./Technologies.stories.jsx";

import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
// import 'jest-styled-components'

const { AllTechs } = composeStories(stories);

describe("The Technologies view snapshots", () => {

  it("renders with all icons when no keywords are selected", () => {
    const { asFragment } = render(<AllTechs />);
    expect(asFragment()).toMatchSnapshot();
  });
});
