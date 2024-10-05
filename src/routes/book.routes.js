import bookControllers from "../controller/book.controllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { bookShema } from "../schema/book.schema.js";
import { validate, validateBookId } from '../middlewares/validation.middlewares.js'

const router = Router();

router.use(authMiddleware);

router.post('/', validate(bookShema), bookControllers.createBookController);

router.get('/', bookControllers.findAllBookController);

router.get('/search', bookControllers.searchBooksController);

router.get('/:id', validateBookId, bookControllers.findByIdBookController);

router.patch('/:id', validateBookId, bookControllers.upDateBookController);

router.delete('/:id', validateBookId, bookControllers.deleteBookcontroller);

export default router;