const User = require('./../models/user');

module.exports = {
  index: async (req, res) => {
    const users = await User.find({}).select('-createdAt -updatedAt -exercises');
    
    res.json(users);
  },
  create: async (req, res) => {
    const { username } = req.body;
    try {
      const user = await User.create({
        username
      })
      
      return res.json({
        username: user.username,
        _id: user._id
      });
    } catch (err) {
      return res.send(err.errors.username.properties.message);
    }
  },
  find: async (req, res) => {
    const { _id } = req.params;
    const user = await User.findById(_id).populate('excercises', 'description duration date');
    
    return res.json({
      _id: user._id,
      username: user.username,
      count: user.excercises.length,
      log: user.excercises
    });
  },
};