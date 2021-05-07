const pool = require('./dbPool');
const bcrypt = require('bcrypt');

const getUserByUsername = async (username) => {
  const dbResponse = await pool.query('SELECT * FROM users WHERE name = $1', [
    username,
  ]);

  return dbResponse.rows[0];
};

const updateUserLastActiveAt = async (lastActiveAt, username) => {
  await pool.query('UPDATE users SET last_active_at = $1 WHERE name = $2', [
    lastActiveAt,
    username,
  ]);
};

const createNewUser = async (username, password, lastActiveAt) => {
  const newUser = await pool.query(
    'INSERT INTO users (name, password, last_active_at) VALUES ($1, $2, $3) RETURNING *',
    [username, password, lastActiveAt]
  );

  return newUser.rows[0];
};

module.exports = { getUserByUsername, updateUserLastActiveAt, createNewUser };
