const express =  require('express');
const mangaRouter = express.Router();

// create manga list
const mangas = [ 
    {id: 1, name: 'Bay vien ngoc rong'},
    {id: 2, name: 'Doraemon'},
    {id: 3, name: 'Tham tu lung danh Conan'}
];


mangaRouter.get('/', function(req, res){
    res.send(mangas);
});

mangaRouter.post('/', function(req, res){
    const newManga = {
        id: `${mangas.length + 1 }`,
        name: req.body.name,
    }
    mangas.push(newManga);
    res.send(mangas)
})

mangaRouter.put('/', function(req, res,){
    mangas.map((item) => {
        if(item.id === req.body.id) {
            item.name = req.body.name;
        }
    })
    res.send(mangas)
})

mangaRouter.delete('/',function(req,res){
    let newMangas = mangas.filter(item=>item.id != req.body.id)
    res.send(newMangas)
})


module.exports = mangaRouter;