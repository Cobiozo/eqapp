import { db, ModelName } from "~/utils/db.server";
import { v4 as uuidv4 } from "uuid";
import { findValueKeyInObj } from "./utils";

// DTOs
type CreateDTO<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

// DB fields types
type DBFieldType = "String" | "Int" | "Float" | "Boolean" | "DateTime" | "Json" | "Enum" | ModelName | `${ModelName}[]`;

export type ForeignFieldDesc = {
  keyField: string;
  referenceField: string;
}

export type DBField = {
  type: DBFieldType;
  id?: true;
  optional?: true;
  default?: string;
  unique?: true;
}

// query methods options
type SelectOptions = {
  where?: Record<string, any>;
  select?: Record<string, any>;
  include?: Record<string, any>;
}

type SelectManyOptions = SelectOptions & {
  orderBy?: Record<string, "DESC" | "ASC">;
  take?: number;
  skip?: number;
}

type UpdateOptions = {
  where?: Record<string, any>;
  data?: Record<string, any>;
}

type DeleteOptions = {
  where?: Record<string, any>;
}

type CountOptions = {
  where?: Record<string, any>;
}

export interface ModelI<T> {
  __relations?: Record<string, ModelName | `${ModelName}[]`>;
  __foreignKeys?: Record<string, ForeignFieldDesc>;
  __fields?: Record<string, DBField>;
  findFirst(options?: SelectOptions): Promise<T | null>;
  findMany(options?: SelectOptions): Promise<T[]>;
  create({ data }: { data: CreateDTO<T> }): Promise<boolean>;
  updateFirst({ where, data }: UpdateOptions): Promise<boolean>;
  deleteFirst({ where }: DeleteOptions): Promise<boolean>
}

class Model<T> implements ModelI<T> {
  constructor(private collection: string) {}

  private getOwnFields() {
    /* @ts-ignore we know that DB has to have proper collection name and fields object */
    const fields = db[this.collection].__fields;
    const standardFields: Record<string, DBField> = {};

    for(const field in fields) {
      /* @ts-ignore we know that DB has to have proper collection name and relations object */
      if (!db[this.collection].__relations[field])
        standardFields[field] = fields[field];
    }

    return standardFields;
  }

  private getForeignFields() {
    /* @ts-ignore we know that DB has to have proper collection name and fields object */
    const fields = db[this.collection].__fields;
    const foreignFields: Record<string, DBField> = {};

    for(const field in fields) {
      /* @ts-ignore we know that DB has to have proper collection name and relations object */
      if (db[this.collection].__relations[field])
        foreignFields[field] = fields[field];
    }

    return foreignFields;
  }

  findFirst(options: SelectOptions): Promise<T | null> {
    return new Promise((resolve, reject) => {

      // we start building select query...
      let query = "SELECT";
      const preparedValues: any[] = [];

      // if there is no select option, we select all fields
      // otherwise we select only fields that are in select option
      if (!options.select)
        query += " * ";
      else
        query += ` ${Object.keys(options.select).join(", ")} `;

      // we add from clause
      query += `FROM ${this.collection}`;

      // if there is where option, we add where clause
      if (options?.where) {
        const [whereClause, wherePreparedValues] = this.buildWhereClause(options.where);
        query += ` WHERE ${whereClause}`;
        preparedValues.push(...wherePreparedValues);
      }

      // we add limit clause
      query += " LIMIT 1";

      db.query(
        query,
        preparedValues,
        async (err, results) => {
          if (err)
            return reject(err);

          // if nothing found -> return null
          if (!results.length)
            return resolve(null);

          // if there is include option, we have to fetch foreign fields
          if (options.include) {

            // first filter include options to get only fields that are really in foreign fields
            const foreignFields = this.getForeignFields();
            const foreignFieldNames = Object.keys(foreignFields);
            const properIncludeFields = Object.keys(options.include)
              .filter(key => foreignFieldNames.includes(key));

            // if there is no proper include fields, we just return result
            if (!properIncludeFields.length)
              return resolve(results[0]);

            // otherwise we have to fetch foreign fields
            const record = results[0];
            for(const field of properIncludeFields) {
              // first we have to check the relation type
              const relationInfo = this.determineRelation(field as keyof T);

              // if its oneToOne relation and this collection is the owner
              // we can simply fetch the data from foreign collection and add it to result
              const relationType = `${relationInfo.ARelation}-to-${relationInfo.BRelation}`;
              if (relationType === "one-to-one" && relationInfo.owner === this.collection) {
                const foreignCollectionName = foreignFields[field].type as ModelName;
                const modelB = db[foreignCollectionName];
                // now we only have we have to find out what field is used to maintain the relation
                const relatedFieldInModelB = findValueKeyInObj(modelB.__relations, this.collection) as string;

                // when we have the field, we can now determine foreign key for it
                const relatedForeignKeyField = modelB.__foreignKeys[relatedFieldInModelB].keyField;

                // now we can fetch the data
                const foreignRelatedRecord = await modelB.findFirst({
                  where: {
                    [relatedForeignKeyField]: record.id
                  }
                });

                // and add it to result
                record[field] = foreignRelatedRecord;
                return resolve(record);
              }
            }

          }

          resolve(results[0] as T);
        }
      );
    });
  }

  updateFirst(options: UpdateOptions): Promise<true> {
    return new Promise((resolve, reject) => {

      // we start building select query...
      let query = `UPDATE ${this.collection} SET`;
      const preparedValues: any[] = [];

      // if there is no data option, we throw an error
      if (!options.data)
        return reject(new Error("No data provided"));

      // we add data to update
      query += ` ${Object.keys(options.data).map(key => `${key} = ?`).join(", ")}`;
      preparedValues.push(...Object.values(options.data));

      // if there is where option, we add where clause
      if (options?.where) {
        const [whereClause, wherePreparedValues] = this.buildWhereClause(options.where);
        query += ` WHERE ${whereClause}`;
        preparedValues.push(...wherePreparedValues);
      }

      // we add limit clause
      query += " LIMIT 1";

      db.query(
        query,
        preparedValues,
        async (err, results) => {
          if (err)
            return reject(err);
          resolve(true);
        }
      );
    });
  }

  deleteFirst(options: DeleteOptions): Promise<true> {
    return new Promise((resolve, reject) => {

      // we start building select query...
      let query = `DELETE FROM ${this.collection}`;
      const preparedValues: any[] = [];

      // if there is where option, we add where clause
      if (options.where) {
        query += ` WHERE ${Object.keys(options.where).map(key => `${key} = ?`).join(" AND ")}`;
        preparedValues.push(...Object.values(options.where));
      }

      // we add limit clause
      query += " LIMIT 1";

      db.query(
        query,
        preparedValues,
        async (err, results) => {
          if (err)
            return reject(err);
          resolve(true);
        }
      );
    });
  }

  findMany(options: SelectManyOptions): Promise<T[]> {
    return new Promise((resolve, reject) => {

      // we start building select query...
      let query = "SELECT";
      const preparedValues: any[] = [];

      // if there is no select option, we select all fields
      // otherwise we select only fields that are in select option
      if (!options.select)
        query += " * ";
      else
        query += ` ${Object.keys(options.select).join(", ")} `;

      // we add from clause
      query += `FROM ${this.collection}`;

      // if there is where option, we add where clause
      if (options?.where) {
        const [whereClause, wherePreparedValues] = this.buildWhereClause(options.where);
        query += ` WHERE ${whereClause}`;
        preparedValues.push(...wherePreparedValues);
      }

      // if there is orderBy option, we add order clause
      if (options.orderBy)
        query += ` ORDER BY ${Object.keys(options.orderBy)[0]} ${Object.values(options.orderBy)[0]}`;

      // if there is skip or take option, we add limit clause
      if (options.skip && options.take)
        query += ` LIMIT ${options.skip}, ${options.take}`;
      else if (options.take)
        query += ` LIMIT ${options.take}`;

      db.query(
        query,
        preparedValues,
        async (err, results) => {
          if (err)
            return reject(err);
          resolve(results as T[]);
        }
      );
    });
  }

  private determineRelation = (field: keyof T) => {

    // find relation for this field
    /* @ts-ignore we know that DB has to have proper collection name and relations object */
    const fieldRelationInfo = db[this.collection].__relations[field];

    // const prepare relation info object, it as one-to-one with no owner, but we will save here info about relation that we will gather along the way
    const relationInfo: {
      ARelation: "one" | "many";
      BRelation: "one" | "many";
      owner: ModelName | null;
    } = {
      ARelation: "one",
      BRelation: "one",
      owner: null
    };

    // prepare easy access to both models
    const modelAName = this.collection as ModelName;
    const modelBName = fieldRelationInfo.replace("[]", "") as ModelName;
    const modelA = db[modelAName];
    const modelB = db[modelBName];

    // if relation doesn't points to an array, it means that it is oneToOne or manyToOne relation
    if (!fieldRelationInfo.endsWith("[]")) {

      // now, we need to determine which one is it
      // we can do that by checking the other model

      // 1. determine what field in model B is related to this field from model A
      let BFieldWithRelationToModelA = "";

      for(const fieldId in modelB.__relations) {
        const field = modelB.__relations[fieldId];
        if (field === this.collection || field === `${this.collection}[]`) {
          BFieldWithRelationToModelA = fieldId;
          break;
        }
      }

      // 2. determine if this found field is an array or not

      // if it's an array, we now that this is a manyToOne relation
      // if it's not an array, we know that this is a one-to-one relation, but we have to check who is the owner
      /* @ts-ignore we know that DB has to have proper collection name and relations object */
      if (modelB.__relations[BFieldWithRelationToModelA].endsWith("[]")) {
        relationInfo.ARelation = "many";
      }
      else {
        // if this field is not an array, we have to check who is the owner
        // we can do that by checking foreign keys, if there is a foreign key saved in modelA, then modelB is the owner
        // otherwise, modelA is the owner
        /* @ts-ignore we know that DB has to have proper collection name and relations object */
        if (modelA.__foreignKeys[field])
          relationInfo.owner = modelBName;
        else
          relationInfo.owner = modelAName;

      }
    } else {

      // if it's an array, we know that this is a one-to-many or many-to-many relation
      // we can determine which one is it by checking the other model
      // if other model has field related to modelA and it point also to an array, then this is a many-to-many relation
      // otherwise, this is a one-to-many relation
      relationInfo.BRelation = "many";

      let BFieldWithRelationToModelA = "";

      for(const fieldId in modelB.__relations) {
        const field = modelB.__relations[fieldId];
        if (field === this.collection || field === `${this.collection}[]`) {
          BFieldWithRelationToModelA = fieldId;
          break;
        }
      }

      /* @ts-ignore we know that DB has to have proper collection name and relations object */
      if (modelB.__relations[BFieldWithRelationToModelA].endsWith("[]"))
        relationInfo.ARelation = "many";
      else
        relationInfo.ARelation = "one";

    }

    return relationInfo;

  }

  private buildWhereClause = (fields: Record<string, any>, operator: "AND" | "OR" = "AND"): [string, any[]] => {

    let query = "";
    const preparedKeys: string[] = [];
    const preparedValues: any[] = [];

    for (const fieldId in fields) {
      const fieldValue = fields[fieldId];
      if (typeof fieldValue === "object" && ["OR", "NOT"].includes(fieldId)) {
        if (fieldId === "OR") {
          const [ORQuery, QueryPreparedValues] = this.buildWhereClause(fieldValue, "OR");
          query += ORQuery;
          preparedValues.push(...QueryPreparedValues);
        }
      }
      else if (typeof fieldValue === "object") {
        if (fieldValue.contains) {
          preparedKeys.push(`${fieldId} LIKE ?`);
          preparedValues.push(`%${fieldValue.contains}%`);
        }
        if (fieldValue.OR) {
          preparedKeys.push(`(${fieldValue.OR.map(() => `${fieldId} = ?`).join(" OR ")})`);
          preparedValues.push(...fieldValue.OR);
        }
      }
      else {
        preparedKeys.push(`${fieldId} = ?`);
        preparedValues.push(fieldValue);
      }
    }

    if (preparedKeys.length)
      query += ` ${preparedKeys.join(" " + operator + " ")}`;

    return [query, preparedValues];
  }

  create({ data }: { data: CreateDTO<T>}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {

        // prepare id for the new record
        const itemId = uuidv4();

        // prepare arrays for FIELDS and VALUES that will be used in SQL query
        const fieldsToAdd: string[] = [];
        const valuesToAdd: string[] = [];

        // split fields into standard and foreign fields
        const ownFields = this.getOwnFields();
        const foreignFields = this.getForeignFields();

        // get standard fields from data and add their names and values to arrays
        for(const field in ownFields) {
          if (field in data) {
            fieldsToAdd.push(field);
            valuesToAdd.push(data[field]);
          }
        }

        // if there is an id field and it isn't set in data, we have to set it manually
        if ("id" in ownFields && !("id" in data)) {
          fieldsToAdd.unshift("id");
          valuesToAdd.unshift(itemId);
        }

        db.query(
          `INSERT INTO ${this.collection} (${fieldsToAdd.join(", ")}) VALUES (${fieldsToAdd.map((v) => `?`).join(", ")})`,
          valuesToAdd,
          async (err) => {
            if (err)
              return reject(err);

            // loop through foreign fields and take care of them
            for(const field in foreignFields) {
              if (field in data) {

                // prepare easy access to both models
                const modelAName = this.collection as ModelName;
                const modelBName = foreignFields[field].type.replace("[]", "") as ModelName;
                const modelA = db[modelAName];
                const modelB = db[modelBName];

                // first of all determine what is relation between this field and the other model
                const relationInfo = this.determineRelation(field as keyof T);

                // if this is oneToOne relation and this model is the owner, we can add new "child" record to the database
                const relationType = `${relationInfo.ARelation}-to-${relationInfo.BRelation}`;
                if (relationType === "one-to-one" && relationInfo.owner === this.collection) {
                  // but first we have to check what field is used to store the parent id
                  // we can do that by checking foreign keys

                  // first we have to find what field is related with modelA
                  const relatedFieldInModelB = findValueKeyInObj(modelB.__relations, this.collection) as string;

                  // when we have the field, we can now determine foreign key for it
                  const relatedForeignKeyField = modelB.__foreignKeys[relatedFieldInModelB].keyField;

                  // create new record in the other model with keyField that points to modelA
                  /* @ts-ignore we know that DB has to have proper collection name and relations object */
                  await db[modelBName].create({
                    data: {
                      ...data[field],
                      [relatedForeignKeyField]: itemId
                    }
                  });
                }
              }
            }

            resolve(true);
          }
        );
      }
      catch(err) {
        reject(err);
      }
    });
  }

  count(options?: CountOptions): Promise<number> {
    return new Promise((resolve, reject) => {
      let query = `SELECT COUNT(*) FROM ${this.collection}`;
      const preparedValues: any[] = [];

      // if there is where option, we add where clause
      if (options?.where) {
        const [whereClause, wherePreparedValues] = this.buildWhereClause(options.where);
        query += ` WHERE ${whereClause}`;
        preparedValues.push(...wherePreparedValues);
      }

      db.query(
        query,
        preparedValues,
        async (err, results) => {
          if (err)
            return reject(err);
          resolve(results[0]["COUNT(*)"]);
        }
      );

    });
  }
}

export default Model;
