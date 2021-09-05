const userModel = require("../models/user");
class UserController {
  async findAll(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const data = await userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit * 1);

    const count = await userModel.countDocuments();

    return res.json({
      users: data,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count,
    });
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
