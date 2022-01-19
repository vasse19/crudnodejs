const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const EmployeeRoute = require('./routes/employee')
const AuthRoute     = require('./routes/auth')

mongoose.connect('mongodb+srv://dbvassea:dbisaac@cluster0.9k3en.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
useNewUrlParser : true,
useUnifiedTopology: true
});

 //import bdd 
const db = mongoose.connection 
//message d'erreur en cas de probleme
db.on('error', (err) => {
    console.log(err)
})
//quand la connection est bonne 
db.once('open', () => {
    console.log('connection etablie a la bdd!')
})

// importer express
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Démarrer le serveur et écouter un port donné

const PORT = 3001

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
  })
  
  app.use('/api/employee', EmployeeRoute)
  app.use('/api', AuthRoute)

  