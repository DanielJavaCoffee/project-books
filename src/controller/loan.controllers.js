import loanService from "../service/loan.service.js";


async function createLoanController(req, res) {
    const {bookId, dueDate} = req.body;
    const userId = req.userId;

    try {
        const loan = await loanService.createLoanService(userId, bookId, dueDate);
        return res.status(201).send(loan);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function findAllLoansController(req, res) {
    try {
        const loans = await loanService.findAllLoansService();
        return res.status(200).send(loans);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function findByIdLoansController(req, res) {
    const {id} = req.params;

    try {
        const book = await loanService.findByIdLoansService(id);
        return res.status(200).send(book);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function deleteLoansController(req, res) {
    const {id} = req.params;
    const userId = req.userId

    try {
        const book = await loanService.deleteLoansService(id, userId);
        return res.status(200).send(book);
    } catch (error) {
        return res.status(200).send(error.message);
    }
}

export default {
    createLoanController,
    findAllLoansController,
    findByIdLoansController,
    deleteLoansController
}