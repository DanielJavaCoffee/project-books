import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
    )
`)

function createUserRepository(newUser){
    return new Promise((resolve, reject) => {
        const {username, email, password, avatar} = new newUser
        db.run(
            `
            INSERT INTO users(username, email, password, avatar)
            VALUE (?, ?, ?, ?)

            `
            [username, email, password, avatar],
            (err) => {
                if(err){
                    reject(err)
                } else {
                    resolve({message: 'user created!'})
                }
            }
        )
    })
}

export default {createUserRepository}