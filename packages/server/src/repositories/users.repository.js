import User from "../models/users.model.js";
import ResponseError from "../../errors/ResponseError.js";

export class UserNotFound extends ResponseError {
    constructor() {
        super({
            statusCode: 404,
            code: 'user_not_found',
            message: 'User not found.'
        });
    }
}
const UserRepository = {

    create: ({username, password, role, firstName, middleName, lastName}) => {
        console.log("Creating user")
        const name = {firstName, middleName, lastName}
        return User.create({email: username, password, role, name})
    },
    update: (id, {password, firstName, middleName, lastName}) => {
        console.log(`Updating user ${id}`)
        const name = {firstName, middleName, lastName}
        const user = User.findById(id);

        if(!user) throw new UserNotFound();

        user.password = password
        user.name = name
        return user.save()
    },
    findByUsername: (username) => {
        return User.findOne({email: username});
    },
    findById(id) {
        return User.findById(id);
    }
}
export default UserRepository;