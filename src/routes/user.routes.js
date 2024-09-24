import { Router } from "express";
import userControllers from "../controller/user.controllers.js";
import { validate, validateUserId } from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";

const router = Router();

router.post('/users', validate(userSchema), userControllers.createUserController);

router.get('/users', userControllers.findAllUsersController);

router.get('/users/:id', validateUserId, userControllers.findUserByIdController);

router.put('/users/:id', validate(userSchema), validateUserId, userControllers.updateUserController);

router.patch('/users/:id', validateUserId, userControllers.updateUserControllerPatch);

router.delete('/users/:id', validateUserId, userControllers.deleteUserController);

export default router;