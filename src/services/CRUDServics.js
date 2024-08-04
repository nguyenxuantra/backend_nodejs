const connection = require('../config/db')


const getAllUsers = async()=>{
    let[results,fields] = await connection.query('select * from Users')
    return results;
}
module.exports = {
    getAllUsers
}