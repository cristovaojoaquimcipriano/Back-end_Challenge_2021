const userModel = require("../models/user");
class UserController {
  async findAll(req, res) {
    const data = await userModel.find();
    return res.json(data);
  }
  async findById(req, res) {
    const data = await userModel.findById(req.params.id);
    return res.json(data);
  }

  async remove(req, res) {
    const data = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "trash",
      },
      { new: true }
    );
    return res.json(data);
  }

  async update(req, res) {
    const data = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.json(data);
  }
}

module.exports = new UserController();
