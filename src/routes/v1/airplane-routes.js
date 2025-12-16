const express = require('express')
const {AirplaneController} = require('../../controllers')
const router = express.Router()
const {AirplaneMiddleWare} = require('../../middlewares')

router.post('/', AirplaneMiddleWare.validateCreateRequest, AirplaneController.createAirplane)
router.get('/', AirplaneController.getAirplanes)
router.get('/:id', AirplaneController.getAirplane)
router.delete('/:id', AirplaneController.destroyAirplane)
router.patch('/:id', AirplaneMiddleWare.validateUpdateRequest, AirplaneController.updateAirplane)

module.exports = router