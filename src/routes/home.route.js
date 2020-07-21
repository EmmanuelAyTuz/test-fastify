const routes = async (fastify, options) => {
    fastify.get('/', async (request, reply) => {
        return { message: 'Welcome to Home!' };
    });
}

module.exports = routes