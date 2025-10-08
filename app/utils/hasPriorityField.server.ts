import { Prisma } from "@prisma/client";
import { db } from "./db.server";

/** Checks if collection has priority field
  @param collection name of the collection to check
  @returns true if collection has priority field, false otherwise
*/
export default function hasPriorityField(collection: string) {
  // We get fields from the model and map detailed object to only names
  const models = Prisma.dmmf.datamodel.models.reduce((acc, model) => ((acc[model.name] = model), acc), {});
  const modelFields = models[collection]?.fields
    .map(i => i.name) || [];

  // We check if the model has a priority field and return this information
  return modelFields.includes("priority");
}
