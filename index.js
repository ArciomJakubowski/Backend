const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNoteById } = require("./notes.controller");

// console.log(__filename);
// console.log(__dirname);
// console.log(process.argv[2]);

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
    // console.log("Add command:", title);
  },
});
yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    const notes = await printNotes();
    console.log(notes);
    // console.log("List command");
  },
});

yargs.command({
  command: "remove",
  describe: "remove note on the notes list",
  handler({ id }) {
    removeNoteById(id);
  },
});

yargs.parse();
