import loanRepositories from "../repositories/loan.repositories.js";
import bookServices from "../service/book.services.js";

async function createLoanService(userId, bookId, dueDate) {

    const book = await bookServices.findByIdBookService(bookId);
    if(!book) throw new Error('Book not Found')

    const createLoan = await loanRepositories.createLoanRepository(userId, bookId, dueDate);
    if(!createLoan) throw new Error('Error creating Loan');
    return createLoan;
}

async function findAllLoansService() {
    const loans = await loanRepositories.findAllLoansRepository();
    return loans;
}

async function findByIdLoansService(id) {
    const book = await loanRepositories.findByIdLoansRepository(id);
    if(!book) throw new Error('Not Found Book!');
    return book;
}

async function deleteLoansService(id, userId) {
    const book = await loanRepositories.findByIdLoansRepository(id);
    if(!book) throw new Error('Not Found Book!');

    if(book.userId !== userId) throw new Error('Unauthorized!');
    const response = await loanRepositories.deleteLoansRepository(id);
    return response;
}

export default {
    createLoanService,
    findAllLoansService,
    findByIdLoansService,
    deleteLoansService
}