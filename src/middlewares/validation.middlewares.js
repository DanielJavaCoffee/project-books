import { userIdSchema } from "../schema/user.schema.js";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next()
    } catch (error) {
        res.status(400).json({error: error.errors});
    }
}

const validateUserId = (req, res, next) => {
    try {
        const id = +req.params.id;
        userIdSchema.parse({id: id})
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }
};

export {validate, validateUserId}