import { FastifyInstance } from "fastify/types/instance";

type Social = {
  id: String;
  name: String;
  link: String;
};
type SocialList = Array<Social>;
type SocialResponse = {
  data: SocialList;
  generated: Date;
};

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/socials",
    {
      schema: {
        operationId: "socials",
        response: {
          200: {
            description:
              "An array of current socials that you can find Mike Elsmore on",
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    link: {
                      type: "string",
                    },
                  },
                },
              },
              generated: {
                type: "string",
                format: "date-time",
              },
            },
          },
        },
      },
    },
    (): SocialResponse => {
      return {
        data: [
          {
            id: "twitter",
            name: "X (formerly Twitter)",
            link: "https://x.com/ukmadlz",
          },
          {
            id: "mastodon",
            name: "Mastodon",
            link: "https://mastodon.social/@ukmadlz",
          },
          {
            id: "github",
            name: "GitHub",
            link: "https://github.com/ukmadlz",
          },
          {
            id: "twitch",
            name: "Twitch",
            link: "https://twitch.tv/ukmadlz",
          },
          {
            id: "linkedin",
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/mikeelsmore/",
          },
        ],
        generated: new Date(),
      };
    },
  );
}
