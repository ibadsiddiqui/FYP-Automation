const User = require('./../../../models/User/User')

module.exports = async (request, response) => {
    console.log(request.body)
    const name = request.body.name;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const profession = request.body.profession;

    var registered;
    console.log(request.body)
    await User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user === null) {
            registered = false
        } else {
            registered = true;
        }

        console.log(registered)

        if (registered === true) {

            // meaning user is already registered by that username
            response.send({ registration: false })

        } else if (registered === false) {

            // following steps registers a new user and sends response
            const newUser = new User({
                _id: username,
                name: name,
                profession: profession,
                username: username,
                email: email,
                password: password,
            });

            User.registerUser(newUser, (err, user) => {
                if (err)
                    response.send({ registration: "Error in creating new user. Please try again" })
                response.send({ registration: true })
            })
        }
    });

}  