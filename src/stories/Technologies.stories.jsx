import React, { useState, useEffect } from 'react';

import content from "../content2.json";
import Technologies from "../components/Technologies";
import { Resolver } from "@stoplight/json-ref-resolver";


import { Context } from "../Context";
const resolver = new Resolver();

const TechnologiesSignature = (args, context) => {
  const [resolvedContent, setContent] = useState(null);
  useEffect(() => {
    resolver.resolve(content).then(resolved => setContent(resolved.result))
  }, []);

  return resolvedContent ? <Technologies {...{ technologies: resolvedContent.technologies.technologies }} /> : <></>;
}


export default {
  title: 'Components/Technologies',
  component: TechnologiesSignature,
};

const Template = (args) => <TechnologiesSignature {...args} />;

export const AllTechs = Template.bind({});
AllTechs.decorators = [
  (Story) => {
    
    return <div>

      <Context.Provider
        value={{
          keywords: []
        }}>
        <Story  />
      </Context.Provider>
    </div>
  }
];

