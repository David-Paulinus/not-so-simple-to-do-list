const baseURL = 'http://localhost:4000';

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


export const addEntryToDatabase = async newEntry => {
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
  }
};


export const updateEntryInDatabase = async updatedEntry => {
  try {
    const response = await fetch(
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


export const deleteEntryFromDatabase = async entry => {
  try {
    const response = await fetch(
      baseURL + '/todoAPI/list',
      {
        method: 'DELETE',
        body: JSON.stringify(entry),
        headers: {'Content-Type': 'application/json'}
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
