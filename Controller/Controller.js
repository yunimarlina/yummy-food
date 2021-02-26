const {Vendor,User} = require('../models/index.js')
const { Op } = require('sequelize');
class Controller{
  static addVendor (req,res,next){
    const { name, menu,tags} = req.body
    Vendor.create({name, menu,tags})
      .then (data=>{
        res.status(201).json({name: data.name, menu: data.menu})
      })
      .catch (err=>{
        if(err){
          if (err.name === 'SequelizeValidationError') {
            let arrErrors = []
            for (let i = 0; i < err.errors.length; i++) {
                arrErrors.push( err.errors[i].message)
            }
            next({ status: 400, message: `${arrErrors}`})
          }
          else if (err.name === 'SequelizeUniqueConstraintError') {
            next({ status: 400, message: err.message })
          }
          next(err)
        }
      })
  }
  static async showAllVendors(req,res){
    try{
      let vendors = await Vendor.findAll()
      res.status(200).json(vendors)

    }
    catch(error){
      res.status(400).json(error)
    }
  }

  static update(req,res,next){
    const editVendor = {
      name : req.body.name,
      menu: req.body.menu,
      tags: req.body.tags,
    } 
    Vendor.update(editVendor, {where: {id: req.params.id},returning: true})
      .then(() => {
          res.status(200).json({message: 'Your Vendor Updated'})
      })
      .catch (err=>{
        if(err){
          if (err.name === 'SequelizeValidationError') {
            let arrErrors = []
            for (let i = 0; i < err.errors.length; i++) {
                arrErrors.push( err.errors[i].message)
            }
            next({ status: 400, message: `${arrErrors}`})
          }
          else if (err.name === 'SequelizeUniqueConstraintError') {
            next({ status: 400, message: err.message })
          }
          res.status(400).json(error)
        }
    })
  }

  static async delete(req,res){
    const id = +req.params.id
    try {
      let data = await Vendor.destroy({
          where: {id},returning: true
      })
      if(!data){
        res.status(400).json({message: 'Data not found'})
      } else{
        res.status(200).json({message:`Success Deleted`})
      }
    } 
    catch (error) {
      res.status(400).json(error)
    }
  }
  static async showDishes(req,res){
    let name = req.params.name
    try{
      let data = await Vendor.findOne({where: {name:name}})
      res.status(200).json(data.menu)
    }
    catch(error){
      res.status(400).json(error)
    }
  }
  
  static async showVendorTags(req,res){
    let tags = req.params.tags
    try{
      let data = await Vendor.findOne({where: {tags:{ [Op.contains]: [tags] }}})
      res.status(200).json(data)

    }
    catch(error){
      res.status(400).json(error)
    }
  }

  static async createOrder(req,res){

    try{
      let order ={
        role: req.body.role,
        dishes: req.body.dishes,
        amount: req.body.amount,
        req: req.body.req
      }
      const data = await User.create(order)
      res.status(200).json(`You Order ${data.dishes} ${data.amount} with ${data.req}`)

    }
    catch(error){
      res.status(400).json(error)
    }
    
  }

}

module.exports = Controller