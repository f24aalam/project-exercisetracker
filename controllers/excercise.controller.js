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

      const user = await User.findById(req.params._id)
      user.excercises.push(excercise);
      await user.save();

      await excercise.populate('user');

      return res.json({
        _id: excercise.user._id,
        username: excercise.user.username,
        date: (new Date(excercise.date)).toDateString(),
        duration: excercise.duration,
        description: excercise.description
      })
    } catch (error) {
      console.log(error)
      // if (error.errors.description) {
      //   return res.send(error.errors.description.properties.message)
      // }

      // if (error.errors.duration) {
      //   return res.send(error.errors.duration.properties.message)
      // }
    }
  }
}