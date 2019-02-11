const express = require('express');
const router = express.Router();
router.get('/', function(req, res){
    console.log('Routing to index2.ejs')
   res.render('index2');
});
module.exports = router