import {getRandomColor, isBrightColor} from "./colors";
import {todoEntry, addEntryToDatabase, deleteEntryFromDatabase, restoreFromDatabase, updateEntryInDatabase} from "./database";


const toDoListElement = document.getElementById("to-do-list");
let toDoListArr: todoEntry[] = []
let updating = false
let updatingElement: Node[] = []


function load_todos () {
  for (const idx in toDoListArr) {
    addListItem(toDoListElement as HTMLElement, toDoListArr[idx]);
  }
}

async function addEvent (inputText: HTMLInputElement) {
  const input: todoEntry = {id: "null", todo: inputText.value};
  input.id = await addEntryToDatabase(input)
  toDoListArr.push(input)
  toDoListElement ? addListItem(toDoListElement, input) : {};
  inputText.value = ""
}


async function updateEvent(listItemContainer: Node, item: todoEntry) {
  const updateButton = listItemContainer.childNodes[1];
  const deleteButton = listItemContainer.childNodes[2];

  if (!updating) {
    updating = true;
    const listItemText = listItemContainer.childNodes[0];
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Change todo!';
    inputBox.className = 'input-box';

    updatingElement.push(listItemText.cloneNode(true));
    listItemText.replaceWith(inputBox);
    updateButton.textContent = "Ok";
    deleteButton.textContent = "Cancel";
  }
  else {
    updating = false;
    const inputBox = listItemContainer.childNodes[0] as HTMLInputElement;
    const newTodo = inputBox.value;
    const listItemText = updatingElement.pop();

    if (listItemText) {
      listItemText.textContent = newTodo
      inputBox.replaceWith(listItemText)
    }

    updateButton.textContent = "Update";
    deleteButton.textContent = 'Delete';

    if (newTodo !== item.todo) {
      item.todo = newTodo
      await updateEntryInDatabase(item);
    }
  }
}


async function deleteEvent (listItem: Node, listItemContainer: Node, item: todoEntry) {
  const updateButton = listItemContainer.childNodes[1]
  const deleteButton = listItemContainer.childNodes[2]

  if (!updating) {
    await deleteEntryFromDatabase(item);
    listItem.parentElement?.removeChild(listItem)
    let itemIdx = toDoListArr.indexOf(item);
    toDoListArr.splice(itemIdx, 1);
  }
  else {
    updating = false;
    const inputBox = listItemContainer.childNodes[0];
    const listItemText = updatingElement.pop();

    listItemText? inputBox.replaceWith(listItemText): {};
    updateButton.textContent = "Update";
    deleteButton.textContent = 'Delete';
  }
}


function addListItem (listElement: HTMLElement, item: todoEntry) {
  // Create a list item element
  let listItem = document.createElement('li');
  listItem.style.width = '500px';

  // Create a container div for flex layout
  let listItemContainer = document.createElement('div');
  listItemContainer.className = "todo-container"
  const backgroundColor = getRandomColor();
  listItemContainer.style.background = backgroundColor;

  // Create the list item text
  let listItemText = document.createElement('span');
  listItemText.textContent = item.todo;
  listItemText.style.flex = '1'; // Allow the text to take up all available space

  if (isBrightColor(backgroundColor)) {
    listItemText.style.color = 'black'
  }
  else{ listItemText.style.color = 'white' }

  // Create the update button
  let updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.className = "todo-button"

  // Create the delete button
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = "todo-button"

  // Append text and buttons to the container
  listItemContainer.appendChild(listItemText);
  listItemContainer.appendChild(updateButton);
  listItemContainer.appendChild(deleteButton);

  // Append container to list item
  listItem.appendChild(listItemContainer);

  // Append the list item to the ordered list element
  listElement.appendChild(listItem);

  updateButton.addEventListener('click', async () => await updateEvent(listItemContainer, item));
  deleteButton.addEventListener('click', async () => await deleteEvent(listItem, listItemContainer, item));
}


let inputButton = document.getElementById("todo-button");
let inputText = document.getElementById('list-entry-box')
inputButton?.addEventListener('click', async () => await addEvent(inputText as HTMLInputElement));

toDoListArr = await restoreFromDatabase()
load_todos()
