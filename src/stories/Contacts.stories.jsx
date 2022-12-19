import React, { useState, useEffect } from 'react';

import content from "../content2.json";
import Contacts from "../components/ContactsCard";
import { Resolver } from "@stoplight/json-ref-resolver";


import { Context } from "../Context";
const resolver = new Resolver();

const ContactsSignature = (args, context) => {
  const [resolvedContent, setContent] = useState(null);
  useEffect(() => {
    resolver.resolve(content).then(resolved => setContent(resolved.result))
  }, []);

  return resolvedContent ? <Contacts {...{ ...resolvedContent.intro.contacts }} /> : <></>;
}


export default {
  title: 'Components/Contacts',
  component: ContactsSignature,
};

const Template = (args) => <ContactsSignature {...args} />;

export const AllContacts = Template.bind({});
AllContacts.decorators = [
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
