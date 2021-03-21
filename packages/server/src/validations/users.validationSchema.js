import * as yup from 'yup';
import Roles from "../models/roles.enum.js";

const name = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string(),
    lastName: yup.string().required('Last name is required')
});

export const getUsers = yup.object().shape({
    page: yup.number(),
    per_page: yup.number()
});

export const createUser = yup.object().shape({
    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
    name,
    dateOfBirth: yup
        .date()
        .typeError('Date of birth invalid'),
    role: yup
        .string()
        .required('Role is required')
        .oneOf([Roles.USER]),
});
