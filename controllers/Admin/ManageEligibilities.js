const Form = require('./../../models/Forms/EligibilityForm')

module.exports = async (request, response) => {
    const users = await Form.find({})
    response.render('manageeligibilities', {users})
}