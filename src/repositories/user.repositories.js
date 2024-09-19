import db from '../config/database.js';

// Criar a tabela 'users' se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
    )
`);

function createUserRepository(newUser) {
    return new Promise((resolve, reject) => {
        const { username, email, password, avatar } = newUser;

        // Inserção no banco de dados
        db.run(
            `
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
            `,
            [username, email, password, avatar],
            function(err) {  // Usar 'function' para acessar 'this'
                if (err) {
                    return reject(err);
                }
                // Retorna o ID gerado e os dados do usuário
                resolve({ id: this.lastID, ...newUser });
            }
        );
    });
}


function findUserByEmailRepository(email) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT id, username, email, avatar
            FROM users
            WHERE email = ?
        `, [email], (err, row) => {
            if(err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

export default {
    createUserRepository,
    findUserByEmailRepository
};
