import express from "express";
import React from "react";
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import { StaticRouter } from "react-router-dom";

// Manish@938

const port = 8000;
const app = express();

// app.use(express.static(path.resolve(__dirname, "..", "build"), { index: false }));

app.get("/favicon.ico", (req, res) => {
  const indexFile = path.resolve(__dirname, "..", "public", "favicon.ico");
  //   const indexFile = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(indexFile, "utf-8", (error, data) => {
    if (error) {
      console.log("error", error);
      return res.status(500).send("Internal server error");
    }

    res.sendFile(indexFile);

    // Use StaticRouter to pass the current URL for SSR
    // const context = {}; // Context to track routing
    // const renderedApp = ReactDOMServer.renderToString(
    //   <StaticRouter location={req.url} context={context}>
    //     <App />
    //   </StaticRouter>
    // );

    // return res.send(data.replace(`<div id="root"></div>`, `<div id="root">${renderedApp}</div>`));
  });
});

app.get("*", (req, res) => {
  const indexFile = path.resolve(__dirname, "..", "public", "index.html");
  //   const indexFile = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(indexFile, "utf-8", (error, data) => {
    if (error) {
      console.log("error", error);
      return res.status(500).send("Internal server error");
    }

    const appHtml = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    );
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/static/css/main.css" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/static/js/main.js"></script>
      </body>
      </html>
    `;
    res.send(html);

    // Use StaticRouter to pass the current URL for SSR
    // const context = {}; // Context to track routing
    // const renderedApp = ReactDOMServer.renderToString(
    //   <StaticRouter location={req.url} context={context}>
    //     <App />
    //   </StaticRouter>
    // );

    // return res.send(data.replace(`<div id="root"></div>`, `<div id="root">${renderedApp}</div>`));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
