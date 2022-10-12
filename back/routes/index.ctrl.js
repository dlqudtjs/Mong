const User = require("../models/User");
const Diary = require("../models/Diary");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },

  write: async (req, res) => {
    const diary = new Diary(req.body);
    const response = await diary.write();
    return res.json(response);
  },

  listview: async (req, res) => {
    const diary = new Diary(req.body);
    const response = await diary.read();
    return res.json(response);
  },
};

module.exports = {
  process,
};
