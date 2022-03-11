const { query } = require('express');
const sql = require('./db.js')

const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};
Tutorial.create = (newTutorial, result) => {
    sql.query('INSERT INTO TUTORIAL SET ?', newTutorial, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('created tutorial: ', { id: res.insertedId, ...newTutorial })
        result(null, { id: res.insertedId, ...newTutorial })
    });
};
Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('found tutorial: ', res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found' }, null);
    });
};
Tutorial.getAll = (title, result) => {
    let query = 'SELECT * FROM tutorials';
    if (title) {
        query += `WHERE title LIKE %${title}%`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        console.log('tutorials: ', res);
        result(null, res);
    });
};
Tutorial.getAllPublished = result => {
    sql.query('SELECT * FROM tutorials WHERE published = true', (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        console.log('tutorials: ', res);
        result(null, res);
    });
};
Tutorial.updateById = (id, tutorial, result) => {
    sql.query('UPDATE tutorials SET title = ?, description = ?, published = ?, WHERE id = ?', 
    [tutorial.title, tutorial.description, tutorial.published, id], (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        if (res.affectRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('update tutorial: ', {id: id, ...tutorial });
        result(null, { id: id, ...tutorial});
    });
};
Tutorial.remove = (id, result) => {
    sql.query('DELETE FROM tutorials WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        if (res.affectRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('deleted tutorial with id: ', id);
        result(null, res);
    });
};
Tutorial.removeAll = result => {
    sql.query('DELETE FROM tutorials', (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        console.log(`deleted ${res.affectRows} tutorial`);
        result(null, res);
    });
};