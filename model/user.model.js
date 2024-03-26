const pool = require('../config/db.config');

class UserModel {

    async checkLogin(login) {
        const find = await pool.query('SELECT login FROM "user" ' +
            'WHERE login = $1', [login]);
        return Boolean(find.rows[0]);
    }

    async createUser(phone, login, hashPassword, role_id) {
        await pool.query('INSERT INTO "user" (phone, login, password, role_id)\n' +
            ' VALUES ($1, $2, $3, $4) RETURNING *;', [phone, login, hashPassword, role_id]);
    }

    async getPassword(login) {
        const find = await pool.query('SELECT password FROM "user" WHERE login = $1', [login]);
        return find.rows[0].password;
    }

    async getIdAndRole(login) {
        const find = await pool.query('SELECT "user".id, role.name AS "role" FROM "user", role' +
            ' WHERE login = $1 AND "user".role_id = role.id;', [login]);
        return find.rows[0];
    }

    async getUser(id) {
        let select = 'select id, phone, login from "user" as u where u.id = $1;';
        const rows = await pool.query(select, [id]);

        return rows.rows[0];
    }

    async updateUser(id, phone, login, role) {
        let select = 'update "user" set phone = $1, login = $2, role_id = $3 where id = $4;';
        await pool.query(select, [phone, login, role, id]);

        return 'OK';
    }

    async getAll() {
        let select = 'select u.id, phone, login, r.name as role from "user" as u, role as r where r.id = u.role_id;';

        const rows = await pool.query(select);

        return rows.rows;
    }

    async deleteById(id) {
        let select = 'delete from "user" where id = $1;';
        await pool.query(select, [id]);

        return 'OK';
    }
}

module.exports = new UserModel();