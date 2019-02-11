const express = require('express');
const router = express.Router();
router.get('/', function(req, res){
    console.log('Routing to index4.ejs')
   res.render('player4');
});
module.exports = router