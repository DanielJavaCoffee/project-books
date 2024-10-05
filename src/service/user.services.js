import userRepositories from "../repositories/user.repositories.js";
import bcrypt from 'bcrypt';
import { generateJWT } from "./auth.services.js";

async function createdUserService(newUser) {
    const foundUser = await userRepositories.findUserByEmailRepository(newUser.email);
    if(foundUser) throw new Error('User already exists!');
    
    const passwordHash = await bcrypt.hash(newUser.password, 10);
    const user = await userRepositories.createUserRepository({...newUser, password: passwordHash});
    
    if(!user) throw new Error('Erro creating user!');
    const token = generateJWT(user.id);
    return token;
};

async function findAllUsersService() {
    const  users = await userRepositories.findAllUsersRepository();
    return users;
};

async function findUserByIdService(id) {
    const user = await userRepositories.findUserByIdRepository(id);

    if(!user) throw new Error('User not Found!');
    return user;
};

async function updateUserService(userId, newUser) {

    const user = await userRepositories.findUserByIdRepository(userId)
    if(!user) throw new Error('User not Found!');
    

    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }

    const userUpdated = await userRepositories.updateUserRepository(userId, newUser)
    return userUpdated;
}

async function updateUserServicePatch(userId, newUser) {

    const user = await userRepositories.findUserByIdRepository(userId)
    if(!user) throw new Error('User not Found!');
    
    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }

    const userUpdated = await userRepositories.updateUserRepositoryPatch(userId, newUser)
    return userUpdated; 
}

async function deleteUserService(id) {
    
    const user = await userRepositories.findUserByIdRepository(id);
    console.log(user)
    if(!user) throw new Error('User not Found!');

    const message = await userRepositories.deleteUserRepository(id);
    return message;
}


export default {
    createdUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    updateUserServicePatch, 
    deleteUserService
};