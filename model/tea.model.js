const pool = require('../config/db.config');

class TeaModel {

    async getAll() {
        const answer = await pool.query('SELECT * FROM tea;');
        return answer.rows;
    }

    async getOneById(id) {
        const answer = await pool.query('SELECT * FROM tea WHERE id = $1;', [id]);

        return answer.rows[0];
    }

    async getAllById(ids) {
        const query = await pool.query('SELECT * FROM tea WHERE id = ANY($1);', [ids]);
        return query.rows;
    }

    async create(name, path_img, info) {
        await pool.query('INSERT INTO tea (name, path_img, info) ' +
            'VALUES ($1, $2, $3);', [name, path_img, info]);

        return 'OK';
    }

    async updateById(id, name, info) {
        await pool.query('UPDATE tea ' +
            ' SET name = $1, info = $2' +
            ' WHERE id = $3;', [name, info, id]);

        return 'OK';
    }

    async updateImgById(id, path_img) {
        await pool.query('UPDATE tea SET path_img = $1 WHERE id = $2;', [path_img, id]);

        return 'OK';
    }

    async deleteById(id) {
        await pool.query('DELETE FROM tea WHERE id = $1;', [id]);

        return 'OK';
    }

}

module.exports = new TeaModel();