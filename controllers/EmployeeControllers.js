//const { response } = require('express')
const Employee = require('../models/Employee')

// Show the list of Employees 
const index = (req, res, next)=> {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Ah error Occured!'
        })
    })
}

//fonction qui ajoute un nouvel employer 
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if(req.file) {
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.avatar = path
    }
    employee.save()
    .then(response => {
        res.json({
            response: 'Employee Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'Ah error Occured!'
        })
    })
}
const show = (req, res, next) =>{
    let employeeID = req.body.employeeID
    Employee.findById(employeeID).then(response => {
        res.json({response})
    
    }).catch(error =>{res.json({message: 'error'})})
}

//modifier employee

const update  = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updateData})
    .then(() => {
        res.json({
            message: 'Employee updated succesfuly !'

        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })

}
        //supprimer un employee 
    const destroy = (req, res, next) => {
        let employeeID = req.body.employeeID
        Employee.findOneAndRemove(employeeID)
        .then(() => {
            req.json({
                message: 'Employee deleted succesfully'
            })
        })
        .catch(error => {
            req.json({
                message: 'an error occured'
            })
        })
    }


    module.exports = {
        index, show, store, update, destroy
    }