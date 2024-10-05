import userServices from "../service/user.services.js";
import { generateJWT, loginService } from "../service/auth.services.js";

async function createUserController(req, res) {
    const newUser = req.body;
    
    try {
        const token = await userServices.createdUserService(newUser)
        return res.status(201).send({token})
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}


async function loginUserController(req, res) {
    const {email, password} = req.body;

    try{
        const user = await loginService(email, password);
        return res.status(200).send({user})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function findAllUsersController(req, res) {
    try {
        const users = await userServices.findAllUsersService();
        return res.status(200).send({users})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function findUserByIdController(req, res) {
    const {id} = req.params;

    try {
        const user = await userServices.findUserByIdService(id);
        return res.status(200).send({user});
    } catch (error) {
        return res.status(404).send({message: error.message})
    }
}

async function updateUserController(req, res) {
    const {id} = req.params;
    const newUser = req.body;

    try {
        const user = await userServices.updateUserService(id, newUser);
        return res.status(200).send({user})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function updateUserControllerPatch(req, res) {
    const {id} = req.params;
    const newUser = req.body;

    try {
        const user = await userServices.updateUserServicePatch(id, newUser);
        return res.status(200).send({user})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function deleteUserController(req, res) {
    const {id} = req.params;

    try {
        const message = await userServices.deleteUserService(id);
        return res.status(200).send({message})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

export default {
    createUserController,
    loginUserController,
    findAllUsersController, 
    findUserByIdController, 
    updateUserController,
    updateUserControllerPatch,
    deleteUserController
}