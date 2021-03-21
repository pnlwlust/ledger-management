const TOKEN_EXPIRES_SECONDS = 24 * 60 * 60;

export default {
  development: {
    jwt: {
      expiresIn: TOKEN_EXPIRES_SECONDS
    }
  },
  production: {
    jwt: {
      expiresIn: TOKEN_EXPIRES_SECONDS
    }
  },
  test: {
    jwt: {
      expiresIn: TOKEN_EXPIRES_SECONDS
    }
  }
};
