import express from "express";
import User from "../../entities/User.entity";
import UserInformation from "../../entities/UserInformation.entity";
import authenticate, { tokens } from "../../middlewares/authenticate";
import { getUserById } from "../user/user.router";

const AuthRouter = express.Router(); 

AuthRouter.post('/signup', async (req, res) => {
    const {username, password, firstName, lastName} = req.body; 
    console.log(req.body);
    

    const user = await User.findOne({
        where: {
            username
        }
    }); 

    if (user) return res.status(400).send({error: "User already exists. "}); 

    const usr = User.create({
        username, 
        password, 
        firstName, 
        lastName, 
        isSetUp: false
    }); 

    console.log(`user id: ${usr.id}`); 

    const userData = UserInformation.create({}); 

    usr.userInformation = userData; 

    await userData.save(); 

    await usr.save(); 

    res.status(200).end(); 
    
}); 

AuthRouter.post('/login', async (req, res) => {
    const {username, password} = req.body; 

    const user = await User.findOne({
        where: {
            username, 
            password
        }
    }); 


    console.log("found user"); 
    console.log(user);
    

    if (!user) return res.status(404).send({error: "User or password incorrect"}); 

    const token = tokens.getTokenByID(user.id); 
    
    if (token) {
        res.cookie('session', token);
        res.end();   
    } else {
        
        const token = Math.random().toString(36).substring(2); // TODO: make this more secure :P

        tokens.add(token, user.id);

        console.log("token: " + token); 
        res.cookie('session', token, {
            secure: true
        });

        res.end();
    }
}); 

AuthRouter.post('/logout', authenticate, async (req, res) => {
    const token = req.authToken; 
    console.log(token);
    
    
    if (token) {
        tokens.remove(token); 
        res.clearCookie('session').status(200).send({message: "Successfully logged out"});   
    } else {
        res.status(400).send({error: "Invalid token"}); 
    }
});  

export default AuthRouter; 