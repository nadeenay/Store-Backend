import express, { Request, Response } from 'express'

import { user, User } from '../models/user'
import jwt from 'jsonwebtoken'
import tokenVerification from '../middlewares/TokenVerification'


const user = new User()

const index = async (_req: Request, res: Response) => {
    const users = await user.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user_ = await user.show(parseInt(req.params.id))
    res.json(user_)
}

const create = async (req: Request, res: Response) => {
    const user_: user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password_:  req.body.password_,
    }
    try {
        const newUser = await user.create(user_)
        var token= jwt.sign({user_id: newUser.id},process.env.TOKEN_SECRET as jwt.Secret)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err as string + user)
    }
}
const authenticate = async (_req: Request, res: Response, next: Function) => {
    const user_: user = {
      id: _req.body.id,
      first_name: _req.body.first_name,
      last_name: _req.body.last_name,
      password_:  _req.body.password,
    }
    try {
        const u = await user.authenticate(user_)
        next()
    } catch(err) {
        res.status(401)
        res.json(err as string + user)
    }
  }
/////////////////////////////////////////////////////////
const userRoutes = (app: express.Application) => {
    app.get('/users',tokenVerification, index)
    app.get('/users/:id',tokenVerification, show)
    app.post('/users', create)
}

export default userRoutes