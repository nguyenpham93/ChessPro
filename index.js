const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

nunjucks.configure({
    autoescape : true
});
app.use('/public',express.static('./public'));
app.engine('html',nunjucks.render);
app.set('views','./views');
app.set('view engine','html');
app.get('/',(req,res)=>{
    res.render('index.html');
});
app.listen(5000,()=>{
    console.log('listen to 5000');
});

