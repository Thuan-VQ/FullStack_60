// dùng express create basic sever
const express =  require('express');
const app = express();
const port = 5000;
const mangaRouter = require('./router/mangaRouter');
const usersRouter = require('./router/usersRouter');

app.use(express.json());
app.use('/api/manga', mangaRouter)
app.use('/api/users', usersRouter)

app.listen(port, () => {
    console.log('Sever running with port ', port);
});