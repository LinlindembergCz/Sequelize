
/*
npm install nodemon -g
npm install --save sequelize
npm install sequelize postgres
npm install express
npm install --save express-handlebars
npm install --save body-parser
*/
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./Models/Post');

//config 
    //template-engine
    app.engine('handlebars', handlebars({defaultlayout:'main'}));
    app.set('view engine','handlebars');    
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());    

    app.get("/",function(req, res) {
        //res.sendFile(__dirname+'/bemvindo.html');
        Post.findAll({order:[['id','DESC']]}).then(function (posts)
                        {
                            res.render('formularios_lista',{posts: posts})
                        })
        } )

    app.get("/cad",function(req, res) {            
            res.render('formularios_add')
        } );

    app.post("/add",function(req, res) 
            {
             Post.create({
                        titulo: req.body.titulo, 
                        conteudo: req.body.conteudo})
                            .then(function()
                                 {res.redirect('/cad');})
                            .catch(function()
                                 {res.send('Erro'); });                  
            });

    app.get('/edit/:id', function(req, res){
                Post.findByPk(req.params.id)
                  .then(post => {
                    res.render('formularios_edit', {
                      id: req.params.id,
                      titulo: post.titulo,
                      conteudo: post.conteudo
                    })
                  })
                  .catch(err => {
                    res.send('Post não encontrado!')
                  })
              })   
              
    app.post('/update', 
             function(req, res){
                Post.update({
                  titulo: req.body.titulo,
                  conteudo: req.body.conteudo}
                  ,
                  {where: { id: req.body.id }}).
                  then(function(){ res.redirect('/');}).
                  catch(function(err){console.log(err);
                })
              })              

    app.get("/delete/:id",function(req, res) {
        Post.destroy({where:{'id': req.params.id}});  
        res.redirect('/');
        } );

    app.listen(8081, 
            function() {
                console.log('servidor rodando');
            } );


