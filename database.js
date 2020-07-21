const { mongodb } = require("./src/config/env");

const mongoose = require("mongoose");

mongoose
    .connect(mongodb, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((db) => {
        console.log("Mongo DB is connected: ", db.connection.client.s.url);
    })
    .catch((err) => {
        console.error("Mongo DB is NOT connected: ", err.message);
    });
