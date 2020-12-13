import "dotenv/config";
const env = process.env;

export default {
  port: env.PORT || "5000",
  apiPrefix: env.API_PREFIX || "/",
  inProd: env.NODE_ENV === "production",
  db: {
    uri: env.MONGODB_URI || "",
  },
  admin: {
    username: env.ADMIN_UNAME || "",
    email: env.ADMIN_UEMAIL || "",
    password: env.ADMIN_UPASS || "",
  },
  jwt: {
    authSecret: env.JWT_SECRET || "",
  },
  store: {
    one: env.STORE_1 || "",
    two: env.STORE_2 || "",
    three: env.STORE_3 || "",
  },
};
