import {query} from "../utils/database.js";

export const getUserByUsername = async (username) => {
    const rows = await query('SELECT * FROM user WHERE username = ? LIMIT 1', [username]);
    return rows[0] ?? null;
}

export const getUserById = async (id) => {
    const rows = await query('SELECT * FROM user WHERE id = ? LIMIT 1', [id]);
    return rows[0] ?? null;
}

export const insertUser = async ({id, username, email, password}) => {
    return await query('INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)', [id, username, email, password]);
}
