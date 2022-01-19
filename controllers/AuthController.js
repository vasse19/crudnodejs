const User  = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({error: err})
        }

        let user = new User ({
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({ message: 'User added Succesfuly!' })
     })
        .catch(error => {
            res.json({ message: 'An error occured!' })
        })

    })
  
}







//

const login = (req, res, next)=> {

    var email = req.body.email
    var password = req.body.passsword 

    console.log('password', req.body.password)
    console.log('email', req.body.email)
    //console.log('usr info', password)

    User.findOne({email}).then(user => {
        
       if(bcrypt.compare(req.body.password, user.password)){

        let token = jwt.sign({name: user.name}, 'thesecrettoken', {expiresIn: '30s'})
        let refreshtoken = jwt.sign({name:user.name}, 'refreshtokensecret', {expiresIn:'48h'})
       
        res.status(200).json({status: "succes", message: "utilisateur trouve", data:{user: user, token: token, refreshtoken: refreshtoken }});
       console.log('refesh',refreshToken)
    
    }else{
           res.json({status: "error", message: "Invalide identifiants", data: null});
       }
                
            }).catch(error =>{
                res.status(404).json({message:'Utilisateur inconnue'})
                console.log(error)
            })
        }
    



      //

    const refreshToken = (req, res, next) => {
        const refreshToken = req.body.refreshToken;
       // var name = req.body.name
        //console.log('name',req.body.name)

        //console.log('token',req.body.refreshToken)

        jwt.verify(refreshToken, 'refreshtokensecret', function(err,decode){
            if(err){
                console.log(err)
                res.status(400).json({
                    err
                })
            }
            else{
                let token = jwt.sign( {name: decode.name }, 'thesecrettoken',{expiresIn: '30s'})
                let refreshToken = req.body.refreshToken 
                res.status(200).json({
                    message: "Token refreshed succesfully!",
                    token,
                    refreshToken

                })
            }
        })
    }

module.exports = {
    register, login, refreshToken
}













