import express, { json } from "express";
const app = express();

app.use(express.json());

const users = [];

app.post('/users', (req, res) => {
    const body = req.body;
    users.push(body);
    res.status(201).send('User criado!');
})

app.get('/users', (req, res)  => {
    res.status(200).send({message: 'Estes são os usuários.', users});
})

app.listen(3000, () => {console.log('Servidor Rodando')})