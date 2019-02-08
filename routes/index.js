const express = require('express');
const router = express.Router();
router.get('/', function(req, res){
    console.log('Routing to index.ejs')
   res.render('index');
});
module.exports = router