import errorMap from "zod/locales/en.js";
import bookRepositories from "../repositories/book.repositories.js";


async function createBookService(newBook, userId) {
    const createBook = await bookRepositories.createBookRepository(newBook, userId);

    if(!createBook) throw new Error('Error creating Book!');
    return createBook;
}

async function findAllBookService() {
    const books = await bookRepositories.findAllBooksRepository();
    return books;
}

async function findByIdBookService(id) {
    const isBook = await bookRepositories.findByIdBookRepository(id);
    
    if(!isBook) throw new Error('Not Found Book');

    return isBook;  
}

async function upDateBookService(bookId, newBook, userID) {
    const book = await bookRepositories.findByIdBookRepository(bookId);
    if(!book) throw new Error('Not Found Book!');

    if(book.userID !== userID) throw new Error('Unauthorized!');
    const response = await bookRepositories.upDateBookRepository(bookId, newBook);
    if(!book) throw new Error('Erro ao Atualizar o Book');

    return response;
}

async function deleteBookService(idBook, userID) {

    const book = bookRepositories.deleteBookRepository(idBook);
    if(!book) throw new Error('Not found book!');

    if(book.userID !== userID) throw new Error('Unauthorized!');
    const response = await bookRepositories.deleteBookRepository(idBook);
    return response;
}

async function searchBooksService(text) {
    if(!text) return await bookRepositories.findAllBooksRepository();
    const books = await bookRepositories.searchBooksRepository(text);
    return books;
}

export default {
    createBookService,
    findAllBookService,
    findByIdBookService,
    upDateBookService,
    deleteBookService,
    searchBooksService
}