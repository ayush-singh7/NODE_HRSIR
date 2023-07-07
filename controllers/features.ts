import { Request,Response } from "express"
import UserModel from "../db/models/user"

// Read All
export const View = async(req:Request,res:Response)=>{
    
    try{
        let userList = await UserModel.find();
        res.status(200).send(userList);
    }catch(e){
        res.status(400).send(e)
    }
}
// Read One
export const ViewOne =async (req:Request, res:Response) => {
    
    try{
        let {id} = req.params
        let user = await UserModel.find({_id:id});
        res.status(200).send(user);

    }catch(e){
        res.status(400).send(e)
    }
}
//Delete One
export const Delete =async (req:Request, res:Response) => {
    try{
        let {id} = req.params
        let user = await UserModel.deleteOne({_id:id});
        res.status(200).send({message:`User with id: ${id} has been deleted`});

    }catch(e){
        res.status(400).send(e)
    }
}
//Update one

export const Update = async (req:Request, res:Response) => {
    
    try{
        let {id} = req.params;
        let {email, first_name, last_name} = req.body;
        let user = await UserModel.updateOne({_id:id}, {$set:req.body});
        res.status(200).send(user);

    }catch(e){
        res.status(400).send(e)
    }
}