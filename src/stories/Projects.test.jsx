import React from 'react';
// import '@testing-library/jest-dom/extend-expect'
import * as stories from "./Projects.stories";

import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
// import 'jest-styled-components'

const { AllProjects } = composeStories(stories);

describe("The Projects view snapshots", () => {

  it("renders all the project cards", () => {
    const { asFragment } = render(<AllProjects />);
    expect(asFragment()).toMatchSnapshot();
  });
});
