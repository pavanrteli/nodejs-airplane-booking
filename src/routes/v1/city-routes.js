const express = require('express')
const {CityController} = require('../../controllers')
const router = express.Router()
const {CityMiddleware} = require('../../middlewares')

router.post('/', CityMiddleware.validateCreateRequest, CityController.createCity)
router.delete('/:id', CityController.destroyCity)
router.get('/', CityController.getCities)
router.patch('/:id', CityMiddleware.validateUpdateRequest, CityController.updateCity)

module.exports = router