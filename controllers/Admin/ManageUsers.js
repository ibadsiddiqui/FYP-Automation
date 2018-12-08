const User = require('./../../models/User/User')
module.exports = async (request, response) => {
    const users = await User.find({});

    if (request.method === 'GET') {
        
        response.render('manageusers', { users })

    } else if (request.method === 'POST') {
        
        await User.getUserByProfession(request.body['id'], async (err, user) => {
            if (err) throw err;
            if (user !== null) {

                if (request.body['status'] === 'blocked') {
                    await User.toggleUserBlocking(request.body['id'], false, (err, updatedUser) => {
                        if (err) throw err;
                        if (updatedUser !== null)
                            response.render('index')

                    })
                } else {
                    await User.toggleUserBlocking(request.body['id'], true, (err, updatedUser) => {
                        if (err) throw err;
                        if (updatedUser !== null)
                            response.render('index')
                    })
                }
            }
        })
        

    }

}