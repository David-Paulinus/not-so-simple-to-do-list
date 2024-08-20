import {findall, addItem, updateItem, deleteItem} from "../models/model.js";

export const getTodoList = async () => {
  return await findall()
}

export const addEntry = async (entry) => {
  return await addItem(entry)
}

export const updateEntry = async (updatedEntry) => {
  return await updateItem(updatedEntry)
}

export const deleteEntry = async (entry) => {
  return await deleteItem(entry);
}
