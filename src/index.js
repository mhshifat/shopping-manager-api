import { env } from "./config";
import { runScriptHandler } from "./helpers";
import { connectToDb, createServer } from "./loaders";

(() => {
  const app = createServer();

  connectToDb()
    .then(() => {
      console.log("🚀 Database connected!");
      return app.listen(env.port);
    })
    .then(() => {
      console.log(`🚀 The server is running on ${env.port}!`);
      return runScriptHandler();
    });
})();
