// const yargs = require("yargs");
// const pkg = require("./package.json");
// const { addNote, printNotes, removeNoteById } = require("./notes.controller");

// const { require } = require("yargs");

// // console.log(__filename);
// // console.log(__dirname);
// // console.log(process.argv[2]);

// yargs.version(pkg.version);

// yargs.command({
//   command: "add",
//   describe: "add new note to list",
//   builder: {
//     title: {
//       type: "string",
//       describe: "Note title",
//       demandOption: true,
//     },
//   },
//   handler({ title }) {
//     addNote(title);
//     // console.log("Add command:", title);
//   },
// });
// yargs.command({
//   command: "list",
//   describe: "Print all notes",
//   async handler() {
//     const notes = await printNotes();
//     console.log(notes);
//     // console.log("List command");
//   },
// });

// yargs.command({
//   command: "remove",
//   describe: "remove note on the notes list",
//   handler({ id }) {
//     removeNoteById(id);
//   },
// });

// yargs.parse();



const server = http.createServer(async (request, response) => {
  //   console.log("Server!");
  //   console.log("Request object", request);
  //   console.log("Request method", request.method);
  //   console.log("Request url", request.url);

  //   response.end("Hello from server!!!");

  if (request.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    // response.setHeader("Content-Type", "text/html");
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(content);
  } else if (request.method === "POST") {
    const body = [];

    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    request.on("data", (data) => {
      //   console.log("data", data);
      body.push(Buffer.from(data));
    });

    request.on("end", () => {
      //   console.log("end", body.toString().split("=")[1].replaceAll("+", " "));
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);
      response.end(`title = ${title}`);
    });
  }
});

// server.listen(port, () => {
//   console.log(chalk.green(`Server has been started on port ${port}...`));
// });