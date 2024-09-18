import {v4 as uuidv4} from 'uuid';
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {TodoEntry} from "../types.js";

const client = new S3Client({
  region: "eu-west-2"
});

export const findall = async (): Promise<TodoEntry[]> => {
  try {
    const getS3Object = new GetObjectCommand({
      Bucket: "not-so-simple-todo-list",
      Key: "datalist.json"
    });

    const response = await client.send(getS3Object);

    if (response.Body) {
      const data = await response.Body.transformToString();
      return JSON.parse(data);
    }
    return [];
  } catch {
    console.log('Failed to get database from S3');
    return [];
  }
}


export const findById = async (id: string) => {
  let todoList = await findall()
  return todoList.find((entry: TodoEntry) => entry.id === id)
}

export const addItem = async (newEntry: TodoEntry) => {
  try {
    let todoList = await findall()

    newEntry.id = uuidv4();
    todoList.push(newEntry);

    const updateS3Object = new PutObjectCommand({
      Bucket: "not-so-simple-todo-list",
      Key: "datalist.json",
      Body: JSON.stringify(todoList),
      ContentType: "application/json"
    });

    const response = await client.send(updateS3Object);
    console.log(`Added to todolist`, response);

    return(`Item ${newEntry.id} added`);
  }
  catch {
    return "Item could not be added";
  }

}

export const update = async (data: TodoEntry) => {
  try {
    let todoList = await findall()
    let entryToUpdate = todoList.find((entry: TodoEntry) => entry.id === data.id);

    if (entryToUpdate && entryToUpdate.todo !== data.todo) {
      const indexOfUpdate = todoList.indexOf(entryToUpdate);

      todoList[indexOfUpdate] = data;

      const updateS3Object = new PutObjectCommand({
        Bucket: "not-so-simple-todo-list",
        Key: "datalist.json",
        Body: JSON.stringify(todoList),
        ContentType: "application/json"
      });

      const response = await client.send(updateS3Object);
      console.log(`Todo list updated`, response);

      return "Update Successful";
    }

    return "No update made"
  } catch (e) {
    return `Update failed because of ${e}`
  }
}

export const deleteItem = async (id: string) => {
  try {
    let todoList = await findall();
    todoList = todoList.filter((entry) => entry.id !== id);

    const updateS3Object = new PutObjectCommand({
      Bucket: "not-so-simple-todo-list",
      Key: "datalist.json",
      Body: JSON.stringify(todoList),
      ContentType: "application/json"
    });

    const response = await client.send(updateS3Object);
    console.log(`Item ${id} has been deleted`, response);

    return "Deletion Successful";
  }
  catch (e) { return `Failed to delete because of ${e}`; }
}
