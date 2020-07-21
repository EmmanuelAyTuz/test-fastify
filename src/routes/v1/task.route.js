//Controller
const taskController = require("../../controllers/task.controller");

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

const editSchema = {
    body: bodySchema,
    params: paramsSchema,
}

const deleteSchem = {
    params: paramsSchema,
}

//Routes and action
const routes = async (fastify, options) => {
    fastify.get('/task/all', taskController.showAll);
    fastify.get('/task/:id', taskController.showSingle);
    fastify.put('/task/edit/:id', { editSchema }, taskController.editSingle);
    fastify.delete('/task/del/:id', { deleteSchem }, taskController.deleteSingle);
    fastify.post('/task/new', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.newSingle);
}

module.exports = routes;