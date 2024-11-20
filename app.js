const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path')
require('./connect')
const userModel = require('./model/user');
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 8000

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())
const bcript = require("bcryptjs");

const isLoggedin = (req, res, next) => {
    if(req.cookies.token == ""){
      return res.redirect("/login")
    }
    else{
      let data = jwt.verify(req.cookies.token, "secret")
      req.user = data
      next()
    }
  }

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/register', (req, res)=>{
    const {name, email, password, cpassword ,phone, who} = req.body;
    try {
        if(password == cpassword){
            bcript.genSalt(10, function (err, salt) {
                bcript.hash(password, salt, async (err, hash) => {
                  let createdUser = await userModel.create({
                    name,
                    email,
                    password: hash,
                    phone
                  });
                  let token = jwt.sign({email}, 'secret')
                  res.cookie("token", token)
                  res.redirect('/home')
                });
              });
        }
        else{
            res.send("Password and conform password must be same")
        }
    } catch (error) {
        console.log(error)
    }

})

app.post('/login', async (req,res)=>{
    const {email, password} = req.body
    try {
        let user = await userModel.findOne({email})
        if(!user){
            return res.status(501).send("Something went wrong")
        }
        bcript.compare(password, user.password, async (error, result)=>{
            if(result){
                res.cookie("token", jwt.sign({ email: email, userid: user._id }, "secret"))
                res.redirect('/home')
            }
            else{
                res.redirect('/login')
            }
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/logout', (req, res)=>{
    res.cookie('token','')
    res.redirect('/login')
})

app.get('/home', isLoggedin, async (req, res)=>{
    const token = req.user
    email = token.email
    const user = await userModel.findOne({email})
    const name = user.name
    res.render('home',{name})
})

app.get('/vocation',isLoggedin, (req, res)=>{
    res.render('vocation')
})

app.get('/textable',isLoggedin, (req, res)=>{
    res.render('textable')
})

app.get('/cooking',isLoggedin, (req, res)=>{
    res.render('cooking')
})

app.get('/gym',isLoggedin, (req, res)=>{
    res.render('gym')
})

app.listen(PORT, ()=>{
    console.log(`server started at port 'http://localhost:${PORT}'`);
})
