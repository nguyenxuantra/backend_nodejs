require('dotenv').config()
const connection = require('../config/db')
const {getAllUsers}= require('../services/CRUDServics')
const jwt = require('jsonwebtoken')


const getHomepage = async (req,res)=>{
    try{   
        let results = await getAllUsers();
        return  res.render('home.ejs',{listUsers:results})
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
const getCreateUsers =(req,res)=>{
    res.render('creatUsers.ejs')
}

const postCreatUser = async (req,res) =>{
    try{
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let [existingEmail] = await connection.query(`SELECT * FROM Users WHERE email = ?`, [email]);
    if (existingEmail.length > 0) {
        let [listUsers] = await connection.query(`SELECT * FROM Users`);
        return res.send('Email đã tồn tại')
    }
    let [results,fields] = await connection.query(`insert into Users(email,name,city) values (?,?,?)`,[email,name,city]);
    return res.redirect('/?message=User created successfully');
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } 
}

const login = (req,res)=>{
    const data = req.body;
    const accessToken =  jwt.sign(data,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
    res.json({accessToken})
}
function authenToken(req,res,next) {
    const authorizationHeader = req.headers['authorization'];
    // Beaer [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        console.log(err,data);
    })
} 
module.exports ={
    getHomepage,getCreateUsers,postCreatUser,login,authenToken
}