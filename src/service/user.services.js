import userRepositories from "../repositories/user.repositories.js";
import bcrypt from 'bcrypt';

async function createdUserService(newUser) {
    const foundUser = await userRepositories.findUserByEmailRepository(newUser.email)
    if(foundUser) throw new Error('User already exists!')

    const passwordHash = await bcrypt.hash(newUser.password, 10);
    const user = await userRepositories.createUserRepository({...newUser, password: passwordHash});

    if(!user) throw new Error('Erro creating user!')
    return user;
}

export default {
    createdUserService
}