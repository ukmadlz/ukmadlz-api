import Package from "./package.json";
import Fastify from "fastify";
import FastifyAPIReference from "@scalar/fastify-api-reference";
import FastifySwagger from "@fastify/swagger";
import Path from "path";
import FastifyAutoload from "@fastify/autoload";

export const Server = async () => {
  const server = Fastify({
    logger: true,
  });

  server.register(FastifySwagger, {
    mode: "dynamic",
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Mike Elsmore API",
        description: "An API for all things Mike Elsmore",
        version: Package.version,
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Development server",
        },
        {
          url: "http://api.elsmore.me",
          description: "Production server",
        },
      ],
    },
  });
  server.register(FastifyAutoload, {
    dir: Path.join(__dirname, "routes"),
  });
  server.register(FastifyAPIReference, {
    routePrefix: "/documentation",
  });
  server.get("/documentation/openapi.json", () => {
    return server.swagger();
  });
  return server;
};
