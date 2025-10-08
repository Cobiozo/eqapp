import { db } from '~/utils/db.server';
import hasPriorityField from './hasPriorityField.server';

export type CreateDTO<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDTO<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

export default function BaseDbModel<T>(collection: keyof typeof db) {
  return class {

    async getAll(): Promise<T[]> {
      // Get an array of all items
      // However, the way they are sorted is based on the priority field
      // If it exists in the collection, we'll use that to sort the items
      // Otherwise, we just use creation date
      if (hasPriorityField(collection))
        return db[collection].findMany({
          orderBy: {
            priority: 'desc',
          },
        });

      return db[collection].findMany();
    }

    async getMany(where?: Record<string, any>, include?: string[], orderBy?: Record<string, any>, take?: number): Promise<T[]> {
      // prepare query
      const query: Record<string, any> = {};

      // if there are any includes, add them to the query
      if (include)
        query.include = include.reduce((acc, curr) => {
          return { ...acc, [curr]: true };
        }, {});

      // if there are any where clauses, add them to the query
      if (where)
        query.where = where;
    
      // if orderBy is provided, add it to the query
      if (orderBy)
        query.orderBy = orderBy;

      // if take is provided, add it to the query
      if (take)
        query.take = take;

      return db[collection].findMany(query);
    }

    async getById(
      id: string,
      include?: string[],
      where?: Record<string, any>,
    ): Promise<T | null> {

      if (!id)
        return null;

      // prepare standard query
      const query: Record<string, any> = {
        where: { id },
      };

      // if there are any includes, add them to the query
      if (include)
        query.include = include.reduce((acc, curr) => {
          return { ...acc, [curr]: true };
        }, {});

      // if there are any where clauses, add them to the query
      if (where)
        query.where = { ...query.where, ...where };

      // @ts-ignore We expect collection to be a valid collection name
      return db[collection].findFirst(query);
    }

    async getOne(
      where?: Record<string, any>,
      include?: string[],
      orderBy?: Record<string, any>,
    ): Promise<T | null> {

      // prepare standard query
      const query: Record<string, any> = {};

      // if there are any includes, add them to the query
      if (include)
        query.include = include.reduce((acc, curr) => {
          return { ...acc, [curr]: true };
        }, {});

      // if there are any where clauses, add them to the query
      if (where)
        query.where = { ...query.where, ...where };

      // if we have `orderBy` param, use it to sort the items
      if (orderBy)
        query.orderBy = orderBy;

      // @ts-ignore We expect collection to be a valid collection name
      return db[collection].findFirst(query);
    }

    async getFirst(
      include?: string[],
      where?: Record<string, any>,
    ): Promise<T | null> {

      // prepare standard query
      const query: Record<string, any> = {};

      // if there are any includes, add them to the query
      if (include)
        query.include = include.reduce((acc, curr) => {
          return { ...acc, [curr]: true };
        }, {});

      // if there are any where clauses, add them to the query
      if (where)
        query.where = { ...query.where, ...where };

      query.orderBy = {
        createdAt: 'desc',
      };

      // @ts-ignore We expect collection to be a valid collection name
      return db[collection].findFirst(query);
    }

    async getByPage(
      page: number,
      perPage: number = 10,
      include?: string[],
      where?: Record<string, any>,
      orderBy?: Record<string, any>,
    ): Promise<T[]> {

      // prepare base query options
      const query: Record<string, any> = {
        skip: perPage * (page - 1),
        take: perPage,
      };

      // if we have `orderBy` param, use it to sort the items
      if (orderBy)
        query.orderBy = orderBy;

      // if there isn't `orderBy` but table has priority field, use it to sort the items
      if (!orderBy && hasPriorityField(collection))
        query.orderBy = {
          priority: 'desc',
        };

      // if there are any includes, add them to the query
      if (include) {
        query.include = include.reduce((acc, curr) => {
          return { ...acc, [curr]: true };
        }, {});
      }

      // if there are any where conditions, add them to the query
      if (where)
        query.where = where;

      return db[collection].findMany(query);
    }

    async search(
      searchString: string,
      fieldsToSearch: string[],
      include?: string[],
      where?: Record<string, any>,
      orderBy?: Record<string, any>,
    ): Promise<T[]> {
      // Get by page returns an array of items for the given page
      // However, the way they are sorted is based on the priority field
      // If it exists in the collection, we'll use that to sort the items
      // Otherwise, we'll use creation date
      // Also we don't take into account all the items.
      // We want only those whose fields (at least one of them) match the search string

      // prepare "or" conditions
      const orFields: Record<string, { contains: string }>[] = [];
      for (const field of fieldsToSearch) {
        orFields.push({ [field]: { contains: searchString } });
      }

      // prepare query
      const query: Record<string, any> = {
        where: {
          OR: orFields,
        },
      };

      // if we have "where" param, add it to the query
      if (where)
        query.where = {
          ...where,
          ...query.where,
        };

      // if we have "orderBy" param, add it to the query
      if (orderBy)
        query.orderBy = orderBy;

      // if we don't have "orderBy" but table has priority field, add it to the query
      if (!orderBy && hasPriorityField(collection))
        query.orderBy = {
          priority: 'desc',
        };

      // if there are any includes, add them to the query
      if (include)
        query.include = include.reduce((acc, curr) => {
          return { ...acc, [curr]: true };
        }, {});

      return db[collection].findMany(query);
    }

    async getTotalCount(where?: Record<string, any>): Promise<number> {
      if (where)
        return db[collection].count({ where });
      else
        return db[collection].count();
    }

    async exists (where?: Record<string, any>): Promise<boolean> {
      return await db[collection].findFirst({
        where,
      }) === null ? false : true;
    }

    async deleteById(id: string): Promise<T | null> {
      // @ts-ignore We expect collection to be a valid collection name
      return db[collection].delete({
        where: { id },
      });
    }

    async updateByPriority(
      priority: number,
      data: UpdateDTO<T>,
    ): Promise<T | null> {
      // @ts-ignore We expect collection to be a valid collection name
      return db[collection].updateMany({
        where: { priority },
        data: {
          ...data,
        },
      });
    }

    async updateById(
      id: string,
      data: UpdateDTO<T>,
    ): Promise<T | null> {
      // @ts-ignore We expect collection to be a valid collection name
      return db[collection].update({
        where: { id },
        data: {
          ...data,
        },
      });
    }

    async getCurrentHighestPriority(
      where?: Record<string, any>,
    ): Promise<number> {

      // prepare query
      const query: Record<string, any> = {
        select: {
          id: true,
          priority: true
        },
        orderBy: {
          priority: 'desc'
        }
      }

      // if we have "where" param, add it to the query
      if (where)
        query.where = where;

      const currentHighestItem = await db[collection].findFirst(query);
      return currentHighestItem ? currentHighestItem.priority : 0;
    }

  };
}
