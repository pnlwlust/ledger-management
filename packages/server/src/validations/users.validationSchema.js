import * as yup from "yup";
import Roles from "../models/roles.enum.js";

const name = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last name is required"),
});

export const getUsers = yup.object().shape({
  page: yup.number(),
  per_page: yup.number(),
});

export const createUser = yup.object().shape({
  username: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Minimum 8 character").matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/, 'Password should contain combination of special characters, numbers and letters'),
  confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
  name,
  dateOfBirth: yup.date().typeError("Date of birth invalid"),
  role: yup.string().oneOf([Roles.USER, Roles.ADMIN]),
});
