// const http = require("http");
const express = require("express");
const chalk = require("chalk");
// const fs = require("fs/promises");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNoteById,
  editNote,
} = require("./notes.controller");

const port = 3000;

// const basePath = path.join(__dirname, "pages");

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", async (request, response) => {
  //   response.sendFile(path.join(basePath, "index.html"));
  response.render("index", {
    title: "Express APP",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (request, response) => {
  // console.log(request.body);

  await addNote(request.body.title);

  //   response.sendFile(path.join(basePath, "index.html"));

  response.render("index", {
    title: "Express APP",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (request, response) => {
  // console.log("id", request.params.id);

  removeNoteById(request.params.id);

  response.render("index", {
    title: "Express APP",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id/:edit", async (request, response) => {
  // console.log("1:", request.params.id);
  // console.log("2:", request.body);
  // console.log(request);
  await editNote(request.params.id, request.body.title);

  response.render("index", {
    title: "Express APP",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
