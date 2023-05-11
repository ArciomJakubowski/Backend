// const { require } = require("yargs");

// const notes = [];

const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");
// console.log(notesPath);

async function addNote(title) {
  // const notes = require("./db.json");
  // const buffer = await fs.readFile(notesPath);

  // console.log(buffer);
  // const notes = Buffer.from(buffer).toString("utf-8");
  // console.log(notes);
  const notes = await getNotes();
  // console.log(notes);
  // console.log(Array.isArray(notes));
  // console.log(typeof JSON.parse(notes));
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  // // await fs.writeFile("./db.json", JSON.stringify(notes));
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

// addNote("Test!");

async function getNotes() {
  // return notes;
  // return require("./db.json");
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id + " " + note.title));
  });
}

async function removeNoteById(id) {
  const notes = await getNotes();
  // console.log(notes);
  // console.log(typeof id);
  const newNotes = notes.filter((note) => {
    return note.id !== id.toString();
  });
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.bgGreen("Note was deleted!"));
}

module.exports = {
  addNote,
  printNotes,
  removeNoteById,
};
