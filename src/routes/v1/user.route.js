//Controller
const taskController = require("../../controllers/task.controller");

//Routes and action
const routes = async (fastify, options) => {
    fastify.get('/user/all', taskController.showAll);
    fastify.post('/user/new', {
        config: {
            rawBody: true //req.rawBody
        },
    }, taskController.newSingle);
}

module.exports = routes;