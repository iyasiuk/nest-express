
/** @format */
if (process.env.NODE_ENV === 'development') {
  require("./env").get()
}
module.exports = {
  version: process.env.SPA_VERSION || "1.0",
  company: process.env.COMPAMY || "",
  ...process.env // TODO: Temporary to check setting of environments on server
};
