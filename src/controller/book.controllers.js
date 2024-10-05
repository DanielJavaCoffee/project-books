import bookServices from "../service/book.services.js";

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId;

    try {
        const createBook = await bookServices.createBookService(newBook, userId);
        return res.status(201).send({createBook});
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

async function findAllBookController(req, res) {
    try {
        const books = await bookServices.findAllBookService();
        return res.status(200).send(books);
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function findByIdBookController(req, res) {
    const {id} = req.params
    try {
        const book = await bookServices.findByIdBookService(id);
        return res.status(200).send(book);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

async function upDateBookController(req, res) {
    const {id} = req.params;
    const newBook = req.body;
    const userId = req.userID;

    try {
        const book = await bookServices.upDateBookService(id, newBook, userId);
        return res.status(200).send(book);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
}

async function deleteBookcontroller(req, res) {
    const {id} = req.params;
    const userID = req.userID;

    try {
        const response = bookServices.deleteBookService(id, userID);
        return res.send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function searchBooksController(req, res) {
    const { text }  = req.query;
    
    try {
        const books = await bookServices.searchBooksService(text);
        return res.status(200).send(books);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
}

export default {
    createBookController,
    findAllBookController, 
    findByIdBookController,
    upDateBookController,
    deleteBookcontroller,
    searchBooksController
}