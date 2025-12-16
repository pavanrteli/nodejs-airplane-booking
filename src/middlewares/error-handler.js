const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.explanation || err.message || 'Something went wrong'

    return res.status(statusCode).json({
        ...ErrorResponse,
        message: message,
        error: err
    })
}

module.exports = errorHandler
