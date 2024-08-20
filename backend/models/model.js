import * as fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';

/**
 * @returns {Promise<({id: number; todo: string;})[]>}
 * **/
export const findall = async () => {
  try {
    return await fs.readFile('database.json', 'utf-8')
      .then((data) => JSON.parse(data))
  } catch {
    console.log('database does not exist, creating database...')
    await fs.writeFile('database.json', JSON.stringify([]))
    return []
  }
}

/**
 * @returns {Promise<{id: number; todo: string;}> | any}
 * **/
export const findById = (id) => {
  return fs.readFile('database.json', 'utf-8')
    .then((data) => JSON.parse(data).find((entry) => entry.id === id))
}

export const addItem = async (newEntry) => {
  try {
    let todoList = await findall()

    newEntry.id = uuidv4();

    todoList.push(newEntry);
    await fs.writeFile('database.json', JSON.stringify(todoList));

    console.log("Item successfully added");
    return newEntry.id
  }
  catch {
    console.log("Item could not be added");
    return null
  }

}

export const updateItem = async (updatedEntry) => {
  try {
    let todoList = await findall()

    let entryToUpdate = todoList.find(entry => entry.id === updatedEntry.id);
    const indexOfUpdate = todoList.indexOf(entryToUpdate);

    if (entryToUpdate.todo !== updatedEntry.todo) {
      todoList[indexOfUpdate] = updatedEntry;
    }
    else{
      console.log('No update needed');
      return "Not updated";
    }

    await fs.writeFile('database.json', JSON.stringify(todoList));
    return "Updated successfully"
  }
  catch {
    return "Failed update"
  }
}

export const deleteItem = async (deletedEntry) => {
   try {
     let todoList = await findall()

     let entryToDelete = todoList.find(entry => entry.id === deletedEntry.id);
     const indexOfDelete = todoList.indexOf(entryToDelete);

     todoList.splice(indexOfDelete, 1);

     await fs.writeFile('database.json', JSON.stringify(todoList));
     console.log("Item successfully deleted");
   }
   catch (e) {
     console.log(`Item could not be delete because ${e}`);
   }
}
