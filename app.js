const express = require("express");
const compression = require("compression");
const { createRequestHandler } = require("@remix-run/express");

let app = express();

// Responses should be served with compression to minimize total network bytes.
// However, where this compression happens can vary wildly depending on your stack
// and infrastructure. Here we are compressing all our Express responses for the
// purpose of this starter repository, but feel free to (re)move it or change it.
app.use(compression());

app.use(express.static("public"));

app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    getLoadContext() {
      // Whatever you return here will be passed as `context` to your loaders
      // and actions.
    }
  })
);

let port = 29108

app.listen(port, () => {
  console.log(`Express server started on http://localhost:${port}`);
});
