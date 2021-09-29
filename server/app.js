const express = require("express");

const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schemaQL = require("./schema/schema");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemaQL,
    graphiql: true,
  })
);

app.listen("4000", () => {
  console.log("Server Up at 4000");
});
