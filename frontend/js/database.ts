const baseURL = 'http://localhost:4000';

export type todoEntry = {
  id: string;
  todo: string;
}

export const restoreFromDatabase = async () => {
  try {
    let response = await fetch(baseURL + '/todoAPI/list')
    let data = await response.json();
    console.log(data)
    console.log("TODO List restored");
    return data;
  }
  catch (err) {
    console.log(`Could not restore todo list because of a ${err}`);
    return []
  }
};


export const addEntryToDatabase = async (newEntry: todoEntry): Promise<string> => {
  try {
    const response = await fetch(
      baseURL + '/todoAPI/list',
      {
        method: 'POST',
        body: JSON.stringify(newEntry),
        headers: {'Content-Type': 'application/json'}
      }
    );

    let id = await response.text()
    console.log(id);
    return id
  }
  catch (e) {
    console.log(`Failed to add new todo to database ${e}`);
    return "null"
  }
};


export const updateEntryInDatabase = async (updatedEntry: todoEntry) => {
  try {
    await fetch(
      baseURL + '/todoAPI/list',
      {
        method: 'PATCH',
        body: JSON.stringify(updatedEntry),
        headers: {'Content-Type': 'application/json'}
      }
    );
    console.log('Successfully updated todo');
  }
  catch (e) {
    console.log(`Failed to update todo in database ${e}`);
  }
}


export const deleteEntryFromDatabase = async (entryId: string) => {
  try {
    const response = await fetch(
      baseURL + '/todoAPI/list',
      {
        method: 'DELETE',
        body: entryId,
        headers: {'Content-Type': 'text/plain'}
      }
    );

    console.log(await response.text());
    return true
  }
  catch (e) {
    console.log(`Failed to add new todo to database ${e}`);
    return false
  }
};
