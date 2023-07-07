import { Request, Response } from "express"
import UserModel from "../db/models/user";
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from "../validation-schemas/onboarding-schema";
const TOKEN_KEY = "ayush"


// Create
export const Register = async(req:Request, res:Response)=>{
    try {
  
      const { first_name, last_name, email, password } = req.body;
  
      const value = await registerSchema.validateAsync({ first_name: first_name, last_name: last_name , email: email, password:password, token:'abc' } );
      console.log(value,"VALUE_VALIDATION");
      
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await UserModel.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      const user = await UserModel.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err:any) {
      
      res.status(400).json(err.details[0].message); 
      

    }
}


export const Login = async(req:Request, res:Response) =>{
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input

      if(!email || !password){
        res.status(400).send("Enter all credentials");

      }

      const value = await loginSchema.validateAsync({ email: email, password:password } );
      

      // Validate if user exist in our database
      const user = await UserModel.findOne({ email });
  
    //   if (user && (await bcrypt.compare(password, user.password))) {
      if (user && (user.password === password)) {

        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err:any) {
      res.status(400).json(err.details[0].message); 

    }
}