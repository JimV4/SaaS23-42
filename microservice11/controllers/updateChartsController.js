const fs = require("fs");
const StoredCharts = require("../models/storedChartsModel");

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the email!",
      });
    }

    await StoredCharts.create({
      email: req.body.email,
    });

    return res.status(200).json({
      status: "success",
      message: "The user was successfully stored in the DB with no charts.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.saveChart = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.type || !req.body.title || !req.body.email) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the type and title of the chart to be stored and the user's email!",
      });
    }

    let path = `../charts/`;

    if (req.body.type == "line-chart") {
      path =
        path + `line-chart/${req.body.email.split("@")[0]}_${Date.now()}.png`;
    } else if (req.body.type == "multi-axis-line-chart") {
      path =
        path +
        `multi-axis-line-chart/${
          req.body.email.split("@")[0]
        }_${Date.now()}.png`;
    } else if (req.body.type == "radar-chart") {
      path =
        path + `radar-chart/${req.body.email.split("@")[0]}_${Date.now()}.png`;
    } else if (req.body.type == "scatter-chart") {
      path =
        path +
        `scatter-chart/${req.body.email.split("@")[0]}_${Date.now()}.png`;
    } else if (req.body.type == "bubble-chart") {
      path =
        path + `bubble-chart/${req.body.email.split("@")[0]}_${Date.now()}.png`;
    } else if (req.body.type == "polar-area-chart") {
      path =
        path +
        `polar-area-chart/${req.body.email.split("@")[0]}_${Date.now()}.png`;
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Please provide a supported chart type!",
      });
    }

    fs.writeFile(`${__dirname}/` + path, req.file.buffer, async (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }

      const user = await StoredCharts.find({
        email: req.body.email,
      });

      if (user.length == 0) {
        return res.status(400).json({
          status: "failed",
          message: "The user no longer exists!",
        });
      }

      user[0].storedCharts.push({
        path: path,
        type: req.body.type,
        title: req.body.title,
      });
      await user[0].save();

      return res.status(200).json({
        status: "success",
        message: "The user's chart was successfully saved in the DB.",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteChart = async (req, res, next) => {
  try {
    if (!req.body.path) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the path of the chart to be deleted!",
      });
    }

    let fullPath = `${__dirname}/../../frontend/src/assets/charts/${req.body.path}`;

    fs.unlink(fullPath, (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "Something went wrong deleting the chart image!",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "The chart image was successfully deleted.",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
