const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const customer_routes = require('./router/routes/auth_users.js').authenticated;
const genl_routes = require('./router/routes/book_routes.js').general;
const public_users = require("./auth_users.js")

require("dotenv").config();

app.use(express.json());

app.use("/customer/auth/*", function auth(req,res,next){
// Write the authenication mechanism here
if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];

    jwt.verify(token, "access", (err, user) => {
        if (!err) {
            req.user = user;
            next();
        } else {
            return res.status(403).json({message: "User not authenticated"});
        }
});
} else {
    return res.status(403).json({message: "User not logged in"});
    }
});

const connectDB = require('./db.js');
connectDB();

const PORT = 5001;

app.use("/", genl_routes);
app.use("/users", customer_routes);


app.listen(PORT,()=>console.log("Server is running"));
