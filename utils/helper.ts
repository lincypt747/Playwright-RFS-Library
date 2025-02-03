 import { dbConnection } from './db';

export const executeQuery = async (query: string, params: any[] = []) => {
  const pool = await dbConnection();
  const [rows] = await pool.execute(query, params);
  return rows;
};

// cleanup DB before tests
export const resetDatabase = async () => {
  await executeQuery('UPDATE books SET status = "available" WHERE status IN ("checked_out", "lost")');
  await executeQuery('DELETE FROM checkouts');
  await executeQuery('DELETE FROM comments');
  await executeQuery('DELETE FROM books WHERE title = "New Book"');
};

// fetch user 
export const getFirstUser= async () => {
  const rows = await executeQuery('SELECT name FROM users WHERE id = 1')
  return rows;
};

// available books
export const getAvailableBooksFromDB = async () => {
  const rows = await executeQuery('SELECT title FROM books WHERE status = "available"');
  return rows;
};

// unavailable books
export const getUnavailableBooksFromDB = async () => {
  const rows = await executeQuery('SELECT title FROM books WHERE status != "available"');
  return rows;
};

// fetch user 
export const getBookId= async () => {
  const rows = await executeQuery('SELECT id FROM books WHERE title = "New Book" ')
  return rows;
};
