import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jate_db = await openDB('jate', 1);
  // Putting requires a read and write transaction
  const trans = jate_db.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const req = store.put({ id: 1, value: content });
  const res = await req;


  console.log(res.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jate_db = await openDB('jate', 1);
  // a get request only requires a read transaction
  const trans = jate_db.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  const req = store.get(1);
  const res = await req;

  if (req) {
    console.log(res.value);
  }else {
    console.log('Error getting data');
  }

  return res.value;

};

initdb();
