//Controller
const taskController = require("../../controllers/v1/task.controller");

//Validations
const bodySchema = {
    type: 'object',
    required: ['title', 'description'],
    properties: {
        title: { type: 'string', minLength: 1, maxLength: 16 },
        description: { type: 'string', minLength: 1, maxLength: 60 },
    }
}

const paramsSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    }
}

/*const querySchema = {
    id: { type: 'string' },
    tag: {
        type: 'string',
        enum: ["normal", "primary", "secondary", "none"]
    },
}*/

const editSingleSchema = {
    body: bodySchema,
    params: paramsSchema,
}

const deleteSingleSchema = {
    params: paramsSchema,
}

/*const deleteManySchema = {
    querystring: querySchema,
}*/

//Routes and action
const routes = async (fastify, options) => {

    //Routes
    fastify.get('/task/new', {}, taskController.formNew);

    fastify.post('/task/new', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.newSingle);

    fastify.get('/task/all', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.formAll); //Ex: GET /{ver}/task/all

    fastify.get('/task/:id', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.formDetail); //Ex: GET /{ver}/task/128

    fastify.get('/task/edit/:id', {}, taskController.formEdit);

    fastify.post('/task/edit/:id', {
        config: {
            rawBody: true //req.rawBody
        },
        editSingleSchema,
    }, taskController.editSingle); //Ex: PUT /{ver}/task/edit?id=128

    fastify.post('/task/del/:id', {
        config: {
            rawBody: true //req.rawBody
        },
        deleteSingleSchema,
    }, taskController.deleteSingle);//Ex: DELETE /{ver}/task/del/128

    fastify.post('/task/del', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.deleteMany); //Ex: DELETE /{ver}/task/del?id=128&id=129
}

module.exports = routes;