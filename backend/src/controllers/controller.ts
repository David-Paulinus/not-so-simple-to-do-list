import {getTodoList, addEntry, updateEntry, deleteEntry} from "../services/service.js"
import {Request, Response} from "express";

export const getList = async (_req: Request, res: Response) => {
  res.send(await getTodoList());
}

export const addEntryToTodoList = async (req: Request, res: Response) => {
  const id = await addEntry(req.body);
  res.send(`Successfully added item to database: ${id}`);
}

export const updateTODO = async (req: Request, res: Response) => {
  const response = await updateEntry(req.body);
  res.send(response)
}

export const deleteTODO = async (req: Request, res: Response) => {
  await deleteEntry(req.body);
  res.send('Successfully deleted item from database')
}
