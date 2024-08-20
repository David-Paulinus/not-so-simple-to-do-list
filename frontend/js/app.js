import {getRandomColor, isBrightColor} from "./colors.js";
import {addEntryToDatabase, deleteEntryFromDatabase, restoreFromDatabase, updateEntryInDatabase} from "./database.js";


const toDoListElement = document.getElementById("to-do-list");
let toDoListArr = []
let updating = false
let updatingElement = []


function load_todos () {
  for (const idx in toDoListArr) {
    addListItem(toDoListElement, toDoListArr[idx]);
  }
}


function clear_todos() {
  toDoListElement.innerHTML = ""
}


async function addEvent () {
  const input = {id: null, todo: inputText.value};
  input.id = await addEntryToDatabase(input)
  toDoListArr.push(input)
  addListItem(toDoListElement, input);
  inputText.value = ""
}


async function updateEvent(listItemContainer, item) {
  const updateButton = listItemContainer.childNodes[1]
  const deleteButton = listItemContainer.childNodes[2]

  if (!updating) {
    updating = true;
    const listItemText = listItemContainer.childNodes[0]
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
    const inputBox = listItemContainer.childNodes[0];
    const newTodo = inputBox.value;
    const listItemText = updatingElement.pop();

    listItemText.textContent = newTodo;
    inputBox.replaceWith(listItemText);
    updateButton.textContent = "Update";
    deleteButton.textContent = 'Delete';

    if (newTodo !== item.todo) {
      item.todo = newTodo
      const _ = await updateEntryInDatabase(item);
    }
  }
}


async function deleteEvent (listItem, listItemContainer, item) {
  const updateButton = listItemContainer.childNodes[1]
  const deleteButton = listItemContainer.childNodes[2]

  if (!updating) {
    const success = await deleteEntryFromDatabase(item);
    listItem.parentElement.removeChild(listItem)
    let itemIdx = toDoListArr.indexOf(item);
    toDoListArr.splice(itemIdx, 1);
  }
  else {
    updating = false;
    const inputBox = listItemContainer.childNodes[0];
    const listItemText = updatingElement.pop();

    inputBox.replaceWith(listItemText);
    updateButton.textContent = "Update";
    deleteButton.textContent = 'Delete';
  }
}


function addListItem (listElement, item) {
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
inputButton.addEventListener('click', async () => await addEvent());

toDoListArr = await restoreFromDatabase()
load_todos()
