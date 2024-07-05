import { Server } from "../server";
import FS from "fs/promises";

const init = async () => {
  const server = await Server();
  await server.ready();
  FS.writeFile("openapi.yml", server.swagger({ yaml: true }));
};

init();
