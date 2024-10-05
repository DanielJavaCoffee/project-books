import jwt from 'jsonwebtoken';
import "dotenv/config"
import userRepositories from '../repositories/user.repositories.js';
import bcryt from "bcrypt"

function generateJWT(id) {
    return jwt.sign(
        {id}, 
        process.env.SECRET_jWT,
        {expiresIn: 86400}
    );
}

async function loginService(email, password) {
    const user = await userRepositories.findUserByEmailRepository(email);
    if(!user) throw new Error('Invalid user!');

    const isPasswordValid = await bcryt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('Invalid user!');

    const token = generateJWT(user.id);
    return token;
}

export { generateJWT, loginService }