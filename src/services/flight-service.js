const {FlightRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error')
const { StatusCodes } = require('http-status-codes')
const {Op} = require('sequelize')
const moment = require('moment')

const flightRepository = new FlightRepository()
async function createFlight(data){
    try{
        const flight = await flightRepository.create(data)
        return flight
    } catch(error){
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query){
    const endingTripTime = " 23:59:00"
    let customFilter = {}
    let sortFilter = []
    if(query.trips){
        [departureAirportId, arrivalAirportId]=query.trips.split("-")
        customFilter.departureAirportId = departureAirportId
        customFilter.arrivalAirportId = arrivalAirportId
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-")
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice==undefined) ? 20000 : maxPrice)]
        }
    }
    if(query.travellors){
        customFilter.totalSeats = {
            [Op.gte]: query.travellors
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if(query.sort){
        const params = query.sort.split(',')
        const sortFilters = params.map((param) => param.split('_'))
        sortFilter = sortFilters
    }

    try{
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch(error){
        throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createFlight,
    getAllFlights
}
