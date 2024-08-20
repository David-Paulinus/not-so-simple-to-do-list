import {getTodoList, addEntry, updateEntry, deleteEntry} from "../services/service.js"

export const getList = async (req, res) => {
  res.send(await getTodoList());
}

export const addEntryToTodoList = async (req, res) => {
  const id = await addEntry(req.body);
  res.send(`Successfully added item to database: ${id}`);
}

export const updateTODO = async (req, res) => {
  const response = await updateEntry(req.body);
  res.send(response)
}

export const deleteTODO = async (req, res) => {
  await deleteEntry(req.body);
  res.send('Successfully deleted item from database')
}
