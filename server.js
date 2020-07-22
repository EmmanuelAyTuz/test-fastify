//Modules
const Fastify = require("fastify");
const fs = require('fs');
const path = require('path');


//Pre
const { port } = require("./src/config/env");

//Build
const build = async () => {
    const fastify = Fastify({ logger: true });

    fastify.addHook('onReady', async () => {
        //Database
        require("./database");
    });

    //await fastify.register(require('fastify-express'));

    //Middlewares
    fastify.register(require('fastify-formbody'));
    fastify.register(require('fastify-raw-body'), {
        field: 'rawBody', // change the default request.rawBody property name
        global: false, // add the rawBody to every request. **Default true**
        encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
        runFirst: true // get the body before any preParsing hook change/uncompress it. **Default false**
    });
    fastify.register(require('fastify-errors-properties'));
    fastify.register(require('fastify-response-validation'))
    /*fastify.register(require('fastify-secure-session'), {
        key: fs.readFileSync(path.join(__dirname, 'secret-key')),
        //node_modules\.bin\secure-session-gen-key > secret-key
        //./node_modules/.bin/secure-session-gen-key > secret-key
        cookie: {
            // options from setCookie
            //path: '/',
            //signed: true
        }
    });*/
    //fastify.register(require('fastify-flash'));
    fastify.register(require('point-of-view'), {
        engine: {
            ejs: require('ejs')
        },
        root: path.join(__dirname, 'src/view'),
        options: {
        },
        includeViewExtension: true, //Ignore extension
    });
    //fastify.register(require('fastify-layout'));

    //Routes
    fastify.register(require("./src/routes/home.route"));
    fastify.register(require("./src/routes/v1/task.route"), { prefix: '/v1' });

    //Init server
    try {
        await fastify.listen(port);
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

build();