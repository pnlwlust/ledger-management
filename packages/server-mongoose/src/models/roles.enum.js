const Roles = Object.freeze({
  ADMIN: "ADMIN",
  USER: "USER",
  all() {
    return [this.ADMIN, this.USER];
  },
});

export default Roles;
