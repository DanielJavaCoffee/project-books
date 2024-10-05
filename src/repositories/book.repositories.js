import db from '../config/database.js';

db.run (`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userID) REFERENCES users(id)
    )`);

function createBookRepository(newBook, userId) {
    return new Promise((resolve, reject) => {
        const {title, author} = newBook;
        db.run(`
            INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`,
            [title, author, userId],
            function (err) {
                if(err) {
                    reject(err)
                } else {
                    resolve({id: this.lastID, ...newBook});
                }
            }
        );
    });
} 

function findAllBooksRepository() {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM books`, [], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            } 
        );
    });
}

function findByIdBookRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM books WHERE id = ?`, 
            [id], 
            (err, row) => { 
                if(err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

function upDateBookRepository(bookId, newBook) {
    return new Promise((resolve, reject) => {
        const fields = ['title', 'author', 'userId'];
        let query = 'UPDATE books SET';
        const values = []

        fields.forEach((field) => {
            if(newBook[field] != undefined) {
                query += ` ${field} = ?,`
                values.push(newBook[field]);
            };
        });

        query = query.slice(0, -1);
        query += ' WHERE id = ?'
        values.push(bookId)

        db.run(query, values, (err) => {
            if(err){
                reject(err)
            } else {
                resolve({id: bookId, ...newBook})
            }
        })
    })
}

function deleteBookRepository(bookId) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM books WHERE id = ?;`, 
            [bookId], 
            function (err) {
            if(err) {
                reject(err)
            } else {
                resolve({message: 'Book deleted sucessfully', bookId})
            }
        });
    });
}

function searchBooksRepository(search) {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM books WHERE title LIKE ? OR author LIKE ?
        `, [`%${search}%`, `%${search}%`], 
        (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}


export default {
    createBookRepository,
    findAllBooksRepository,
    findByIdBookRepository,
    upDateBookRepository,
    deleteBookRepository,
    searchBooksRepository
}