const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate') 

const OngController = require('./controllers/OngController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')
const sessionsController = require('./controllers/sessionsController')

const routes = express.Router()

routes.post('/sessions', sessionsController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorizantion: Joi.string().required(),
    }).unknown(),
}), profileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index)

routes.post('/incidents', incidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),incidentController.delete)

module.exports = routes