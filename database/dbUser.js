const pool = require('./dbPool');

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
  console.log('username from dbUser :>> ', username);

  const newUser = await pool.query(
    'INSERT INTO users (name, password, last_active_at) VALUES ($1, $2, $3) RETURNING *',
    [username, password, lastActiveAt]
  );

  console.log('newUser from dbUser:>> ', newUser);

  //create the same user on cash_balances table
  // await pool.query(
  //   'INSERT INTO cash_balances (amount, user_id) VALUES (0, $1)',
  //   [newUser.rows[0].id]
  // );

  return newUser.rows[0];
};

module.exports = { getUserByUsername, updateUserLastActiveAt, createNewUser };
