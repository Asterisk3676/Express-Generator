const mysql = require('mysql2');

let db;

(async () => {
    db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'express'
    });

    db.connect((err, client) => {
        if (err) throw err;
    });

    db.query(`
    CREATE TABLE IF NOT EXISTS course (
        id SERIAL,
        PRIMARY KEY(id),
        c_id text,
        name text,
        creditPoint text
    );`, (err, result) => {
        if (err) throw err;
    });
})();

class Course {
    static all(cb) {
        db.query('SELECT * FROM course', cb);
    }

    static findOne(id, cb) {
        db.query('SELECT * FROM course WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        db.query(`INSERT INTO course (c_id, name, creditPoint) VALUES ('${data.c_id.toUpperCase()}', '${data.name}', '${data.creditPoint}')`, cb);
    }

    static update(data, cb) {
        db.query(
            `UPDATE course SET c_id = '${data.c_id.toUpperCase()}', name = '${data.name}', creditPoint = '${data.creditPoint}' WHERE id=${data.id}`, cb
        );
    }

    static delete(id, cb) {
        if(!id) return cb(new Error('Please provide an id!!!'));
        db.query('DELETE FROM course WHERE id = ?', id, cb);
    }
}

module.exports = Course;