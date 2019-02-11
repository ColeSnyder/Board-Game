const express = require('express');
const router = express.Router();
router.get('/', function(req, res){
    console.log('Routing to index1.ejs')
   res.render('player1');
});
module.exports = router