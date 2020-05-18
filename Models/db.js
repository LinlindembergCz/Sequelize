const Sequelize = require('sequelize');

//conexao com o banco de dados
sequelize = new Sequelize('postgres', 'postgres', '982666', 
{
    host: 'localhost',   
    dialect: 'postgres'
});

module.exports = 
{ 
   Sequelize : Sequelize, 
   sequelize : sequelize
}