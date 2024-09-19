import userRepositories from "../repositories/user.repositories.js";

async function createdUserService(newUser){
    const user = await userRepositories.createUserRepository(newUser);
    return user;
}

export default {
    createdUserService
}