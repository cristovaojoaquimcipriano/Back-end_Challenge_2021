const jwt = require("jsonwebtoken");
class AuthController {
  authenticate(req, res) {
    const { username, password } = req.body;
    console.log(req.body);
    const fakeAdmin = {
      id: 21,
      username: "admin",
      password: "challenge#2021",
    };
    if (username == fakeAdmin.username && password == fakeAdmin.password) {
      const token = jwt.sign(
        {
          id: fakeAdmin.id,
          username: fakeAdmin.username,
          password: fakeAdmin.password,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "180h",
        }
      );

      return res.json(token);
    } else return res.json({ message: "Invalid user!" });
  }
}

module.exports = new AuthController();
