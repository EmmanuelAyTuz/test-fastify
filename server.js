//Modules
const fastify = require("fastify")({ logger: true });

//Pre
const { port } = require("./src/config/env");

//Database
require("./database");


//Middlewares
fastify.register(require('fastify-boom'));
fastify.register(require('fastify-formbody'));
fastify.register(require('fastify-raw-body'), {
    field: 'rawBody', // change the default request.rawBody property name
    global: false, // add the rawBody to every request. **Default true**
    encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true // get the body before any preParsing hook change/uncompress it. **Default false**
});

//Routes
fastify.register(require("./src/routes/home.route"));
fastify.register(require("./src/routes/v1/task.route"), { prefix: '/v1', logLevel: 'debug' });

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