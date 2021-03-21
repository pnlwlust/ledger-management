import _ from "lodash";

export default function authorize(roles) {
    return function middleware(req, res, next) {
        if (_.intersection([req.user.role], roles).length) {
            return next();
        }

        return res.status(401).json({
            object: 'error',
            code: 'unauthorized',
            message: 'You are not authorized.'
        });
    };
}
