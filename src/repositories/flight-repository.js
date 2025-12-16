const crudRepository =require("./crud-repository")
const {Flight, Airplane, Airport} = require("../models")
const {Sequelize} = require("sequelize")
class FlightRepository extends crudRepository {
    constructor(){
        super(Flight)
    }

    async getAllFlights(filter, sort){
        const reponse = await Flight.findAll({
            where : filter,
            order : sort,
            include : [
                {
                    model : Airplane,
                    required : true,
                    as : 'airplane_detail'
                },
                {
                    model : Airport,
                    required : true,   
                    as : 'departure_airport',
                    on : {
                        col1 : Sequelize.where(
                            Sequelize.col("Flight.departureAirportId"),
                            "=", Sequelize.col("departure_airport.code"))
                    }
                }
            ],
            
        })
        return reponse
    }
}

module.exports = FlightRepository


