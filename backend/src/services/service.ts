import {findall, addItem, deleteItem, update} from "../models/model.js";
import {TodoEntry} from "../types.js";


export const getTodoList = async () => {
  return await findall()
}

export const addEntry = async (entry: TodoEntry) => {
  return await addItem(entry)
}

export const updateEntry = async (updatedEntry : TodoEntry) => {
  return await update(updatedEntry)
}

export const deleteEntry = async (entryId: string) => {
  return await deleteItem(entryId);
}
