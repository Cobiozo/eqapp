import { User, userModel } from "~/models/user.server";

/** It checks if protege is somewhere in the tree of given user. It doesn't have to be direct protege of given user, it can be deeper. */
/* @param userId User to check */
/* @param protegeId Protege to check */
/* @returns True if protege is somewhere in the tree of given user, false otherwise */
export default async function isInProtegeTree(
  userId: User["id"],
  protegeId: User["id"]
): Promise<boolean> {

  // determine proteges tree of given user
  const userProtegesTree = await userModel.getProtegesTree(userId);

  // convert it to text
  const userProtegesTreeText = JSON.stringify(userProtegesTree);

  // determine if id of protege is somewhere in the tree
  return userProtegesTreeText.includes(protegeId);
}