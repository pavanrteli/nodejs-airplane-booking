const express = require('express')
const {FlightController} = require('../../controllers')
const router = express.Router()
const {FlightMiddleware} = require('../../middlewares')

router.post('/', FlightMiddleware.validateCreateRequest, FlightController.createFlight)
router.get('/', FlightController.getAllFlights)

module.exports = router