import mysql  from 'mysql2/promise';
import config from "../config/config.js";

// One shared pool - connections are reused instead of opened for every query
const pool = mysql.createPool(config.db);

export async function query(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}
