const express = require('express');
const { options } = require('../app');
const router = express.Router();

router.get('/', function(req, res){
    res.render('index', { title: "Lớp WebFullStack60"});
})

module.exports = router;