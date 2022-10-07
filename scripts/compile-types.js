import { compileFromFile } from 'json-schema-to-typescript'
import fs from "fs";

// compile from file
compileFromFile('src/schemas/projects-schema.json')
  .then(ts => fs.writeFileSync('src/types/projects.d.ts', ts))

compileFromFile('src/schemas/content-schema.json')
  .then(ts => fs.writeFileSync('src/types/content.d.ts', ts))