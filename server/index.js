import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

class Todo {
    constructor(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}

let id = 3;
const STATUS = {
    TODO: 'TODO',
    DOING: 'DOING',
    DONE: 'DONE',
};
const todoList = [{
    id: 1,
    name: 'Learn NodeJS',
    status: STATUS.TODO,
}, {
    id: 2,
    name: 'Learn ReactJS',
    status: STATUS.DOING,
}, {
    id: 3,
    name: 'Learn AngularJS',
    status: STATUS.DONE,

}];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/todo', (req, res) => {
    id = id + 1;
    const todo = new Todo(
        id,
        req.body.name,
        STATUS.TODO,
    );

    todoList.push(todo);
    console.log(todoList);
    res.send(todo);
});

app.get('/todo', (req, res) => {
    res.send(todoList);
});

app.get('/todo/:id', (req, res) => {
    const id = +req.params.id;
    const todo = todoList.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).send({ message: 'Todo not found' });
        return;
    }
    res.send(todo);
});

app.put('/todo/:id', (req, res) => {
    const id = +req.params.id;
    const todo = todoList.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).send({ message: 'Todo not found' });
        return;
    }
    todo.name = req.body.name;
    todo.status = req.body.status;
    res.send(todo);
});

app.delete('/todo/:id', (req, res) => {
    const id = +req.params.id;
    const index = todoList.findIndex(todo => todo.id === id);
    todoList.splice(index, 1);
    res.send();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
