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
    CREATE TABLE IF NOT EXISTS students (
        id SERIAL,
        PRIMARY KEY(id),
        st_id text,
        name text
    );`, (err, result) => {
        if (err) throw err;
    });
})();

class Student {
    static all(cb) {
        db.query('SELECT * FROM students', cb);
    }

    static find(field, value, cb) {
        db.query(`SELECT * FROM ${field[0]} WHERE ${field[1]} = '${value}'`, cb);
    }

    static findOne(id, cb) {
        db.query('SELECT * FROM students WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        db.query(`INSERT INTO students (st_id, name) VALUES ('${data.st_id}', '${data.name}')`, cb);
    }

    static update(data, cb) {
        db.query(
            `UPDATE students SET st_id = '${data.st_id}', name = '${data.name}' WHERE id=${data.id}`, cb
        );
    }

    static delete(id, cb) {
        if(!id) return cb(new Error('Please provide an id!!!'));
        db.query('DELETE FROM students WHERE id = ?', id, cb);
    }
}

module.exports = Student;