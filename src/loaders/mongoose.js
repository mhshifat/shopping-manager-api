import { env } from "../config";

export default function (url) {
  return require("mongoose")
    .connect(url || env.db.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.error("DB ERROR: " + err.message);
      process.exit(1);
    });
}
