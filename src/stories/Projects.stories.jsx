import React, { useState, useEffect } from 'react';

import content from "../content2.json";
import Projects from "../components/Projects";
import { Resolver } from "@stoplight/json-ref-resolver";


import { Context } from "../Context";
const resolver = new Resolver();

const ProjectsSignature = (args, context) => {
  const [resolvedContent, setContent] = useState(null);
  useEffect(() => {
    resolver.resolve(content).then(resolved => setContent(resolved.result))
  }, []);

  return resolvedContent ? <Projects {...{ projects: resolvedContent.projects.projects }} /> : <></>;
}


export default {
  title: 'Components/Projects',
  component: ProjectsSignature,
};

const Template = (args) => <ProjectsSignature {...args} />;

export const AllProjects = Template.bind({});
AllProjects.decorators = [
  (Story) => {

    return <div>

      <Context.Provider
        value={{
          keywords: []
        }}>
        <Story />
      </Context.Provider>
    </div>
  }
];

export const Frontend = Template.bind({});
Frontend.decorators = [
  (Story) => {

    return <div>

      <Context.Provider
        value={{
          keywords: ["Frontend"]
        }}>
        <Story />
      </Context.Provider>
    </div>
  }
];

export const Backend = Template.bind({});
Backend.decorators = [
  (Story) => {

    return <div>

      <Context.Provider
        value={{
          keywords: ["Backend"]
        }}>
        <Story />
      </Context.Provider>
    </div>
  }
];

