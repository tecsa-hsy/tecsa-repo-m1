
const mariaDb = require('mariadb');

const pool = mariaDb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lucky_wheel_db',
  connectionLimit: 5
});

const initialGameState = {
  wins: 0,
  losses: 0,
  lastResult: null,
};

/**
 * @function readGameState
 * @description reads current gs & returns it
 * @returns {Promise<GameState>}
 */
async function readGameState() {
  console.log(`mariaDb.readGameState called`);
  let conn;
  try {
   conn = await pool.getConnection();
   const rows = await conn.query("SELECT wins, losses, last_result FROM game_state ORDER BY id DESC LIMIT 1");

   if (rows.length === 1) {
      return {
      wins: rows[0].wins,
      losses: rows[0].losses,
      lastResult: rows[0].last_result,
    }
   } else {
    return {wins: 0, losses: 0, lastResult: null};
   }
  } catch (error) {
    console.error(`mariaDb reading gs failed`, error);
    return {wins: 0, losses: 0, lastResult: null};
  } finally {
    if (conn) conn.end();
  }
}

/**
 * @function saveGameState
 * @description saves gs to data source
 * @returns {Promise<void>}
 */
async function saveGameState(gs) {
  console.log(`mariaDb.saveGameState called`);
  let conn;
  try {
   conn = await pool.getConnection();
   await conn.query("INSERT INTO game_state (wins, losses, last_result) VALUES (?, ?, ?)", 
    [gs.wins, gs.losses, gs.lastResult]);
  } catch (error) {
    console.error(`mariaDb saving gs failed`, error);
  } finally {
    if (conn) conn.end();
  }
}

/**
 * @function resetGameState
 * @description reset gs in data source to initial value
 * @returns {Promise<GameState>}
 */
async function resetGameState() {
  console.log(`mariaDb.resetGameState called`);
  let conn;
  try {
   conn = await pool.getConnection();
   await conn.query("TRUNCATE TABLE game_state");
    return {wins: 0, losses: 0, lastResult: null};
  } catch (error) {
    console.error(`mariaDb resetting gs failed`, error);
    return {wins: 0, losses: 0, lastResult: null};
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  readGameState,
  saveGameState,
  resetGameState,
};
