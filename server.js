const fastify = require("fastify")({ logger: true });
const { port } = require("./src/config/env");

//Routes

//Middlewares

//Init server
const start = async () => {
    try {
        await fastify.listen(port);
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();