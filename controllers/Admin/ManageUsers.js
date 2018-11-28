const User = require('./../../models/User/User')
module.exports = async (request, response) => {
    const users = await User.find({});
    response.render('manageusers', {users})

}