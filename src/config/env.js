const dotenv = require("dotenv");
const { error, parsed } = dotenv.config();

try {
    if (error) {
        throw error;
    }
    //Environments of the project
    module.exports = {
        port: parsed.PORT,
    };
    console.log("Success ENV: ", parsed);
} catch (err) {
    console.error("Error ENV:", err.message, "Please rename or create .env");
}
