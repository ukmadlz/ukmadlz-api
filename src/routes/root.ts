import { FastifyInstance } from "fastify/types/instance";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            description:
              "An array of current socials that you can find Mike Elsmore on",
            type: "object",
            properties: {
              data: {
                type: "array",
                properties: {
                  name: {
                    type: "string",
                  },
                  link: {
                    type: "string",
                  },
                },
              },
              generated: {
                type: "string",
              },
            },
          },
        },
      },
    },
    () => {
      return {
        data: [
          {
            name: "Socials",
            link: "/socials",
          },
        ],
        generated: new Date(),
      };
    },
  );
}
