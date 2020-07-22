const homeController = require("../controllers/home.controller");

const routes = async (fastify, options) => {
    fastify.get('/', {}, homeController.home);

    fastify.get('/test', (req, rep) => {
        req.flash('warning', ['username required', 'password required']);
        const warning = rep.flash('warning');
        rep.send({ warning }); // {"warning":["username required","password required"]}
    });
}

module.exports = routes