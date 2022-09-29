# CV-builder

## Goal
To create an open source package with features that make it easier for developers to have a nice looking interactive CV, to launch it as a website, and to be able to print it to PDF and distribute it. 

The package should take a json object with the content that matches a json-schema. Since it's json-schema based, it should be easy to later on generate a form that allows users to generate CVs online and print them. 

There will be a basic styling, and the possibility to customize using CSS selectors. More customization capabilities can be added later on, but it's not the initial priority.

## Purpose
This project is meant to make it simple and easy for developers to build a good looking CV.
This is a project to exercise and test some techniques and frameworks, like: json-schemas, playwright, react state managing.

json-schemas: explore it as a way of keeping a documented and validated format for the input of the module, so that it's easier to document while increasing the functionality, since documentation becomes part of the code.

playwright: because it seems faster than cypress.

react state managing: reflect upon the state managing pattern, exercising the critic view of when a state should be local and when should it be shared in a context. 

code pattern: exercise on the code pattern of having a function with multiple paths depending on argument and configuration. So far I like the readability of it.

front end magic: also wanna try some cool effects to add to my frontend toolbelt.

## MVP

- Parse a json and generate a CV.
- Read images specified in the public directory
- Allow for the following sections:
  - intro
  - experiences
  - technologies
  - education
  - projects
- Fully tested
  - unit tests full coverage
  - snapshot tests
  - play with playwright to test it

## Tech stack
- React
- Vite
- Json-Schema
