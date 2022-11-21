const jwt = require("jsonwebtoken");
const jwtKey = "jwt";


const verify_user = async (req, res, next) => {
    // Get token value to the json body
    const token = req.body.token;

    // If the token is present
    if (token) {

        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, jwtKey);

        //  Return response with decode data
        res.json({
            login: true,
            data: decode
        });
    } else {

        // Return response with error
        res.json({
            login: false,
            data: 'error'
        });
    }
}

module.exports = verify_user;
