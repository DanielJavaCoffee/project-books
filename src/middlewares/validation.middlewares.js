import { userIdSchema } from "../schema/user.schema.js";
import { bookIdShema } from "../schema/book.schema.js";
import { loanIdShema } from "../schema/loan.schema.js";

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

const validateBookId = (req, res, next) => {
    try {
        const id = +req.params.id;
        bookIdShema.parse({id: id});
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }
}

const validateLoansId = (req, res, next) => {
    try {
        const id = +req.params.id;
        loanIdShema.parse({id: id});
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }
}


export { validate, validateUserId, validateBookId, validateLoansId }