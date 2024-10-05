import { Router } from 'express';
import loanControllers from '../controller/loan.controllers.js';
import { validate, validateLoansId } from '../middlewares/validation.middlewares.js'
import { loanSchema } from '../schema/loan.schema.js';

const router = Router();

router.post('/',  validate(loanSchema),loanControllers.createLoanController);

router.get('/', loanControllers.findAllLoansController);

router.get('/:id', validateLoansId, loanControllers.findByIdLoansController);

router.delete('/:id', validateLoansId, loanControllers.deleteLoansController);

export default router;
