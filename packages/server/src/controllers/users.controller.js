
export function createUser(req, res, next){
    try{

        res.status(200).send({
            status: "success",
            object: "user"
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
