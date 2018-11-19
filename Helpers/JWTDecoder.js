const jwtDecode = require('jwt-decode');

module.exports = (JWT) => {
    const decodedJWT = jwtDecode(JWT)
    return decodedJWT.id
}