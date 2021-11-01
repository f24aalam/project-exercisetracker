const Excercise = require('./../models/excercise');
const User = require('./../models/user');

module.exports = {
  create: async (req, res) => {
    const { description, duration, date } = req.body;
    
    try {
      const excercise = await Excercise.create({
        description,
        duration,
        date: date == "" ? new Date() : date,
        user: req.params._id
      })

      const user = await User.findOneAndUpdate(
        { _id: req.params._id},
        { $push: { excercises: excercise }},
        { new: true }
      )
      .exec();

      return res.json({
        _id: user._id,
        username: user.username,
        date: (new Date(excercise.date)).toDateString(),
        duration: excercise.duration,
        description: excercise.description
      })
    } catch (error) {
      if (error.errors.description) {
        return res.send(error.errors.description.properties.message)
      }

      if (error.errors.duration) {
        return res.send(error.errors.duration.properties.message)
      }
    }
  }
}