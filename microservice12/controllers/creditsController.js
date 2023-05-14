const User = require(`${__dirname}/../models/userModel`);

exports.getRemainingCredits = async (req, res, next) => {
  try {
    const userLoggedIn = "ioannisg"; // TODO
    let user = await User.findOne(
      { username: userLoggedIn },
      "-_id creditsAmount"
    );

    if (!user) {
      user = await User.create({
        username: userLoggedIn,
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "User's credits returned successfully!",
      data: {
        amount: user.creditsAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error,
    });
  }
  next();
};

exports.addCredits = async (req, res, next) => {
  return res.status(418).send(`I'm a teapot!`);
};

exports.useCredits = async (req, res, next) => {
  return res.status(418).send(`I'm a teapot!`);
};
