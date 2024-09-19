import userServices from "../service/user.services.js";

async function createUserController(req, res) {
    const newUser = req.body;
    try {
        const user = userServices.createdUserService(newUser)
        res.status(201).send({user})
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

export default {
    createUserController
}