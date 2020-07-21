//Controller
const taskController = require("../../controllers/task.controller");

//Routes and action
const routes = async (fastify, options) => {
    fastify.get('/task/all', taskController.showAll);
    fastify.post('/task/new', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.newSingle);
}

module.exports = routes;