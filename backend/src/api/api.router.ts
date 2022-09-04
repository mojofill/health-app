import express from "express";
import OAuthRouter from "./auth/auth.router";
import UserRouter from "./user/user.router";

const ApiRouter = express.Router(); 

ApiRouter.use('/auth', OAuthRouter); 
ApiRouter.use('/user', UserRouter); 


export default ApiRouter; 