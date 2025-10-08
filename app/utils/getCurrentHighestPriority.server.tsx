import { db } from "./db.server";

export default async function getCurrentHighestPriority(
  collection: string,
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
