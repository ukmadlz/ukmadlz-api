import { FastifyInstance } from "fastify/types/instance";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/ping",
    {
      schema: {
        operationId: "ping",
        response: {
          200: {
            description: "Pong if it worked",
            type: "string",
          },
        },
      },
    },
    async (_request, _reply) => {
      return "pong";
    },
  );
}
