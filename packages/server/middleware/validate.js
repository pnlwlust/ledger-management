function transformErrors(error) {
    return error.inner.reduce((acc, current) => {
        return { ...acc, [current.path]: current.errors[0] };
    }, {});
}

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const rawData = ['POST', 'PUT', 'PATCH'].includes(req.method)
                ? req.body
                : req.query;
            const data = await schema.validate(rawData, {
                abortEarly: false,
                recursive: true
            });

            req.data = data;
            return next();
        } catch (error) {
            try {
                const errors = transformErrors(error);
                return res.status(400).send({
                    object: 'error',
                    code: 'validation',
                    errors
                });
            } catch (e) {
                console.error(e);
                return res.status(500).send({
                    object: 'error',
                    code: 'internal_server_error',
                    message: e.message
                });
            }
        }
    };
};

export default validate;
