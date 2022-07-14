const express =  require('express');
const usersRouter = express.Router();

const users = [
   { id: 1, name: 'Nguyen Tuan Anh' },
   { id: 2, name: 'Nguyen Van A' },
   { id: 3, name: 'Tran Thi B' },
]

usersRouter.get('/', function(req, res){
    res.send(users);
});

usersRouter.post('/', function(req, res){
    const newUser = {
        id: `${users.length + 1}`,
        name: req.body.name,
    }
    users.push(newUser)
    res.send(users)
});

usersRouter.put('/', function(req, res){
    users.map((item) => {
        if(item.id === req.body.id) {
            item.name = req.body.name;
        }
    })
    res.send(users)
});

usersRouter.delete('/', function(req, res){
    const newUsers = users.filter(item => item.id != req.body.id) 
    res.send(newUsers)
});

module.exports = usersRouter;