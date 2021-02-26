const router = require('express').Router()
const Controller = require('../Controller/Controller')


router.post('/vendor', Controller.addVendor)
router.post('/order', Controller.createOrder)
router.get('/vendors', Controller.showAllVendors)
router.get('/vendor/:tags', Controller.showVendorTags)
router.get('/vendor/:name', Controller.showDishes)
router.put('/vendor/:id', Controller.update)
router.delete('/vendor/:id', Controller.delete)

module.exports = router