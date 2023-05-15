// console.log("Hello from app.js");

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    // console.log("ID", id);

    remove(id).then(() => {
      // event.target.parentNode.remove()
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const { id, title } = event.target.dataset;
    // console.log("id", typeof id);

    const note = prompt("Введите новое название", title);
    console.log();

    const newNote = {
      title: note,
    };
    console.log("newNote", newNote);
    if (note) {
      edit(id, newNote);
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, formData) {
  await fetch(`/${id}/edit`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
