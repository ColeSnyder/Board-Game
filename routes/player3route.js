const express = require('express');
const router = express.Router();
router.get('/', function(req, res){
    console.log('Routing to index3.ejs')
   res.render('index3');
});
module.exports = router