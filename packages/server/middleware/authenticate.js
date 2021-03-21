import * as passport from "passport";

export default function authenticate(req, res, next) {
    return passport.authenticate(
        'auth-check',
        { session: false },
        (err, user) => {
            if (err)
                return res.status(500).json({
                    code: 'server_error',
                    message: err.message
                });
            if (!user)
                return res.status(401).json({
                    object: 'error',
                    code: 'unauthorized',
                    message: 'You are not authorized.'
                });

            req.user = user;

            return next();
        }
    )(req, res);
}

