const textBox = document.getElementById("textBox");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

addButton.addEventListener("click", () => {
    const value = textBox.value.trim();

    if (!value) {
        return;
    }

    const li = document.createElement("li");

    li.className = "todoItem";
    const span = document.createElement("span");

    span.className = "todoText";
    span.innerHTML = value;
    const del = document.createElement("button");

    del.innerHTML = "Delete";
    del.addEventListener("click", () => {
        todoList.removeChild(li);
    });
    li.appendChild(span);
    li.appendChild(del);
    todoList.appendChild(li);
    textBox.value = "";
});
