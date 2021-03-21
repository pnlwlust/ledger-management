import * as userService from '../services/users.service.js'

export function createUser(req, res, next){
    try{

        const user = userService.createUser(req.body)
        res.status(200).send({
            status: "success",
            object: "user",
            user
        })
    }catch (err){
        next(err)
    }
}
export function getUser(req, res, next){
    try{

        res.status(200).send({
            status: "success",
            object: "user"
        })
    }catch (err){
        next(err)
    }
}
