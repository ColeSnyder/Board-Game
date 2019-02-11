const express = require('express');
const router = express.Router();
router.get('/', function(req, res){
    console.log('Routing to index4.ejs')
   res.render('index4');
});
module.exports = router