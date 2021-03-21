import ResponseError from "../../errors/ResponseError.js";
import UserRepository from "../repositories/users.repository.js";

export function createUser(params){
    const { username, password, confirmPassword, role } = params;

    if (password !== confirmPassword)
        throw new ResponseError({ status: 413, error: 'Password Mismatch' });

    // const usernameExist = await UserRepository.findUserByUsername(username);
    // if (usernameExist) throw { status: 413, error: 'Username already taken' };

    return UserRepository.create({ username, password, role });
}

export function updateUser(id, params){

    return UserRepository.update(id, params);
}

export async function getUser(id){
    return UserRepository.findById(id)
}

export async function resetPassword(id, params){
    const { oldPassword, password, confirmPassword } = params;
    if (password !== confirmPassword)
        throw { status: 413, error: 'Password Mismatch' };

    const user = await UserRepository.findById(id);
    if (!user)
        throw { status: 413, error: 'User with this username not found' };

    if (oldPassword === password)
        throw { status: 413, error: 'Cannot use previous password' };

    return UserRepository.update(id, { password });
}
