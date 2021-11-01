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

    var excerciseOptions = {
      path: 'excercises', 
      select: 'description duration date',
      match: {},
      options: {}
    };

    if (req.query.limit) {
      excerciseOptions.options.limit = req.query.limit;
    }

    if (req.query.from) {
      excerciseOptions.match = {
        date: {
          $gte: req.query.from
        }
      }
    }

    if (req.query.to) {
      excerciseOptions.match = {
        date: {
          $lte: req.query.to
        }
      }
    }

    console.log(excerciseOptions);

    const user = await User.findById(_id).populate(excerciseOptions);
    
    return res.json({
      _id: user._id,
      username: user.username,
      count: user.excercises.length,
      log: user.excercises
    });
  },
};