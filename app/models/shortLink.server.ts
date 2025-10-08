import type { ShortLink } from "@prisma/client"
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";
import shortid from "shortid";

export type { ShortLink };

class ShortLinkModel extends BaseDbModel<ShortLink>("shortLink") {
  async generate(request: Request, url: string): Promise<string> {

    // determine origin to add to the short link
    // in db we have only pathname, so we need to add origin here while returning the short link
    const pageUrl = new URL(request.url);
    const origin = pageUrl.origin;

    // try to find shortLink in db
    // if is there, just return it (with origin of course)
    const shortLink = await db.shortLink.findFirst({
      where: { target: url },
    });
    if (shortLink)
      return `${origin}/${shortLink.link}`;

    // otherwise generate random link
    // save it to db and then return it

    // generate short link using shortid
    let uniqueId = shortid.generate();

    // make sure it doesn't exist yet (just in case)
    // shortid are pretty unique, but still...
    // if it does, generate new one
    const alreadyExists = await db.shortLink.findFirst({
      where: { link: uniqueId },
    });
    if (alreadyExists)
      uniqueId = shortid.generate();

    // save to db
    await db.shortLink.create({
      data: {
        link: uniqueId,
        target: url,
      },
    });

    // return full short link
    return `${origin}/${uniqueId}`;
  }

  async getByTarget(target: string) {
    return db.shortLink.findFirst({
      where: { target },
    });
  }

  async getByLink(link: string) {
    return db.shortLink.findFirst({
      where: { link },
    });
  }

}

export const shortLinkModel = new ShortLinkModel();
