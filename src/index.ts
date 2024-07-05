import { Server } from "./server";

const init = async () => {
  const server = await Server();
  server.listen(
    {
      port: Number(process.env.PORT || 8080),
      host: String(process.env.PORT ? "0.0.0.0" : "127.0.0.1"),
    },
    (err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
    },
  );
};

init();
