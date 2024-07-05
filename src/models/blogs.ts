import md5 from "md5";
import * as htmlparser2 from "htmlparser2";

interface IArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  timestamp: Date;
  type: string;
  source: string;
}

const hashId = (type: string, reference: string) => {
  return md5(`${type}:${reference}`);
};

export const devTo = async (): Promise<Array<IArticle>> => {
  const type = "devto";
  const url = "https://dev.to/api/articles/me";
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached\\
    headers: {
      "api-key": String(process.env.DEV_TO_API_KEY),
    },
  });
  const articles = await response.json();
  return articles
    .filter((article: any) => {
      return article.published;
    })
    .map((article: any): IArticle => {
      const { id, title, description, url, published_timestamp } = article;
      return {
        id: hashId(type, id),
        title,
        description,
        url,
        timestamp: published_timestamp,
        type,
        source: type,
      };
    });
};

export const wordpress = async (
  url: string,
  source: string,
): Promise<Array<IArticle>> => {
  const type = "wordpress";
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  });
  const rssString = await response.text();
  const wordpressData: any = htmlparser2.parseFeed(rssString);
  return (
    Array.isArray(wordpressData.items)
      ? wordpressData.items
      : [wordpressData.items]
  ).map((article: any) => {
    const { title, pubDate, description, link } = article;
    return {
      id: hashId(type, link),
      title,
      description,
      url: link,
      timestamp: new Date(pubDate),
      type,
      source,
    };
  });
};
