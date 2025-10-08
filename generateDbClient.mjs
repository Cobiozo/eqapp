import path from "path";
import fs from "fs";

// Helper functions
/*const getDataSourceDataFromDeclaration = (declaration) => {
  // 1. get only contents of the datasource declaration
  const dataSourceContent = datasourceDeclaration.match(/{((?!})(.|\s))+}/mg)[0];
  if (!dataSourceContent) {
    throw new Error("No datasource found in schema.prisma");
  }

  // 2. Get rid of the curly braces
  const dataSourceContentWithoutBraces = dataSourceContent.replace(/{|}/g, "");

  // 3. Split the datasource content into lines
  const dataSourceContentLines = dataSourceContentWithoutBraces.split("\n");

  // 4. Get rid of spaces
  const dataSourceContentLinesWithoutSpaces = dataSourceContentLines
    .map((line) => line.trim())
    .map((line) => line.replace(/ /g, ""))
    .filter((line) => line.length > 0);

  const dataSourceData = {};

  // 5. Loop over every line and split it into key and value
  for (const line of dataSourceContentLinesWithoutSpaces) {
    const [key, value] = line.split("=");

    // get rid of quotes
    let parsedValue = value.replaceAll('"', "");

    // if the value is an env variable, get the value from the env
    if (parsedValue.startsWith("env")) {
      const envVariableName = parsedValue.replace("env(", "").replace(")", "");
      parsedValue = process.env[envVariableName];
    }
    dataSourceData[key] = parsedValue
  }

  return dataSourceData;
}*/

const prepareModels = (modelsDeclarations) => {
  const models = {};

  // convert every model declaration to a model object
  for (const modelDeclaration of modelsDeclarations) {

    // start model object with two additional properties
    // in relations will store information about relations of given model with other models
    // foreign fields will be used to store info about foreign fields details (e.g. that userId is a foreign key to User model)
    const model = {
      __relations: {},
      __foreignKeys: {},
    };

    // 1. get model name
    const modelName = modelDeclaration
      .match(/model\s\w+/g)[0]
      .replace("model ", "");

    // 2. get model fields lines
    // 2.1 get only contents of the model declaration
    const modelContent = modelDeclaration.match(/{((?!})(.|\s))+}/mg)[0];

    // 2.2 Get rid of the curly braces
    const modelContentWithoutBraces = modelContent.replace(/{|}/g, "");

    // 2.3 Split the model content into lines, trim then and get rid of empty lines
    const modelContentLines = modelContentWithoutBraces
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // 3. loop over every line and get the field name, type and others properties
    for(const line of modelContentLines) {
      const [fieldName, ...fieldProperties] = line
        .split(" ")
        .filter(line => line.length > 0);

      // 3.1 get field type
      let fieldType = fieldProperties.shift();

      // 3.2 check other properties (like @id, @unique, @default, etc)
      const otherProperties = fieldProperties
        .join('')
        .split('@')
        .filter(line => line.length > 0);

      // 3.3 loop over them and add info about them to the field
      const additionalInfo = {};
      for(const property of otherProperties) {
        // if the is just an info about field characteristics, like @id, @unique, @default, etc, just add it to the additionalInfo object
        if (["id", "unique", "updatedAt", "createdAt"].includes(property)) {
          additionalInfo[property] = true;
        }

        // if it's default field, extract default value setting and save it next to property name
        if (property.startsWith("default")) {
          const defaultValue = property.replace("default(", "").replace(")", "");
          additionalInfo["default"] = defaultValue;
        }

        // if it's relation, extract relation type and save it next to property name
        if (property.startsWith("relation")) {

          // get property details
          const propertyDetails = property
            .match(/\[[a-zA-Z]+\]/g)

          // if no details, do not set foreign key info
          if (!propertyDetails)
            continue;

          // get field it and reference id
          const [keyFieldName, referenceFieldName] = propertyDetails
            .map(i => i.replaceAll(/\[|\]/g, ""));

          model.__foreignKeys[fieldName] = {
            keyField: keyFieldName,
            referenceField: referenceFieldName,
          }
        }

      }

      // 3.3 if type has question mark on the end, it means that the field is optional, remove "?" from the type, but add info about it to the additionalInfo object
      // Also treat xxxId fields as optional, Id fields are considered as foreign keys, not normal fields that are required
      if (fieldType.endsWith("?") || fieldName.includes("Id")) {
        additionalInfo["optional"] = true;
        fieldType = fieldType.replace("?", "");
      }

      // 3.4 if type is not normal supported type, treat it as a relation field and by so make it optional
      // also save this relation info in the __relations object
      // otherwise change first letter to lower case
      if (!["String", "Int", "Float", "Boolean", "DateTime", "Json", "Enum"].includes(fieldType)) {
        additionalInfo["optional"] = true;
        model.__relations[fieldName] = fieldType;
      } else {
        fieldType = fieldType[0].toLowerCase() + fieldType.slice(1);
      }

      // 3.5 add field to model
      model[fieldName] = {
        type: fieldType,
        ...additionalInfo
      }
    }

    // 4. add model to models obj
    models[modelName] = model;
  }

  return models;
}

/** It creates db.server.ts file for handling DB. */
const prepareDbClientFile = (models) => {

  // 1. we start with the imports
  let content = `import mysql from "mysql2";
import type { ModelI, DBField, ForeignFieldDesc } from "~/db/modelBase.server";
import Model from "~/db/modelBase.server";
import { getMysqlConfigFromUrl } from "~/db/utils";
\n`;

  // 2. add additional types, that aren't normally available in typescript, but are supported by prisma
  content += `
/* Prisma additional types */
export type json = string;
export type dateTime = string;
export type bytes = string;
export type decimal = string;
export type bigInt = string;\n`;

  // 3. loop over every model and create types for models
  for (const model of Object.keys(models)) {
    const modelFields = Object.keys(models[model])
      .filter((field) => field !== "__relations" && field !== "__foreignKeys")
      .map((fieldId) => {
        const field = models[model][fieldId];

        // if the field is optional, add question mark to the end the field name
        if (field.optional) {
          fieldId += "?";
        }

        // prepare field line
        return `${fieldId}: ${field.type}`;
      })

    content += `
/* ${model} model */
export type ${model} = {
  ${modelFields.join(';\n  ')}
};\n`;
  }

  content += `export type ModelType = ${Object.keys(models).join(" | ")};\n`;
  content += `export type ModelName = ${Object.keys(models).map(m => `"${m}"`).join(" | ")};\n`;

  // 4. extend db object type with models params
  content +=
`type MysqlConnectionWithModels = mysql.Connection & ${Object.keys(models).map((field) => `{ ${field}: Readonly<ModelI<${field}>> & { __relations?: Record<string, string>, __foreignKeys?: Record<string, ForeignFieldDesc>, __fields?: Record<string, DBField> } }`).join(' & ')}

let db: MysqlConnectionWithModels;

declare global {
  var _db: MysqlConnectionWithModels | undefined
}

const dbConfig = getMysqlConfigFromUrl();

const host = dbConfig.host;
const user = dbConfig.username;
const password = dbConfig.password;
const database = dbConfig.database;

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = mysql.createConnection({
    host,
    user,
    password,
    database,
  });
} else {
  if (!global._db) {
    global._db = mysql.createConnection({
      host,
      user,
      password,
      database,
    });
  }
  db = global._db
}\n`;

  // 5. loop over every model and create types for models
  const renderObjectParams = (obj) => {
    let content = '{\n';
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      content += `  ${key}: ${typeof value === "object" ? renderObjectParams(value) : `"${value}"` },\n`;
    }
    content += '}';
    return content;
  }

  for (const model of Object.keys(models)) {
    const modelFields = {};
    for (const field of Object.keys(models[model])) {
      if (field !== "__relations" && field !== "__foreignKeys") {
        modelFields[field] = models[model][field];
      }
    }
    content += `\ndb.${model} = new Model<${model}>("${model}");
db.${model}.__relations = ${renderObjectParams(models[model].__relations)}
db.${model}.__foreignKeys = ${!Object.keys(models[model].__foreignKeys).length ? `{}` : renderObjectParams(models[model].__foreignKeys)}
db.${model}.__fields = ${renderObjectParams(modelFields)}\n`;
  }

  content += `\n\nexport { db };`;

  fs.writeFileSync(path.join("app", "utils", "db.server.ts"), content);

}

// ======== MAIN PROCESS =========

// Read prisma schema content
const schemaPath = path.join("prisma", "schema.prisma");
const schemaContents = fs.readFileSync(schemaPath, "utf8");
if (!schemaContents) {
  throw new Error("No schema.prisma found");
}

// Match declarations from the schema (e.g. model User { ... }, generator client {)
const schemaDeclarations = schemaContents
  .match(/[a-zA-Z]+\s[a-zA-Z]+\s\{((?!})(.|\s))+\}/mg);

// Loop over every declaration and split them into models, generators, and datasource
const modelsDeclarations = [];
const generatorsDeclarations = [];

for(const dec of schemaDeclarations) {
  if(dec.startsWith('model')) {
    modelsDeclarations.push(dec);
  } else if(dec.startsWith('generator')) {
    generatorsDeclarations.push(dec);
  }
}

const models = prepareModels(modelsDeclarations);

// generate db client file
prepareDbClientFile(models);
console.log("=== DB client file generated! ===");
