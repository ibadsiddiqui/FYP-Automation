const Form = require('../../models/Forms/EligibilityForm')

module.exports = async (req, res) => {
    const value = await Form.findById({ _id: req.body['id'] })
    if (value.status == "pending") {
        console.log(value)
        if (req.body['status'] === 'rejected') {
            await Form.toggleStatus(req.body['id'], 'rejected', (err, updatedStatus) => {
                if (err) throw err;
                if (updatedStatus !== null) {
                    console.log(updatedStatus);
                    res.render('index')
                }
            })
        } else {
            await Form.toggleStatus(req.body['id'], 'accepted', (err, updatedStatus) => {
                if (err) throw err;
                if (updatedStatus !== null) {
                    console.log(updatedStatus);
                    res.render('index')
                }
            })
    
        }
    } 
}