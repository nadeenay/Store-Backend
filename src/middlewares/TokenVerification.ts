import jwt from "jsonwebtoken"
import express, { Request, Response } from 'express'

const tokenVerification= async (req: Request, res: Response, next: Function) =>
{
    try{
        const authorizationHeaders= req.headers.authorization
        const token = authorizationHeaders?.split(' ')[1]
        jwt.verify(token as string, process.env.TOKEN_SECRET as string)
        next()

    }catch(err){
        res.status(401);
        res.json('Access denied , Token is not defiend')
        return 
    }

}


export default  tokenVerification;