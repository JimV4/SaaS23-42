const axios = require("axios");
const fs = require("fs");

exports.getPNG = async (req, res, next) => {
  try {
    if (!req.body.type || !req.body.image) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the type and the name of the PNG file!",
      });
    }

    if (req.body.image.split("_")[0] != req.email.split("@")[0]) {
      return res.status(403).json({
        status: "failed",
        message:
          "You cannot download a chart SVG image that you have not purchased!",
      });
    }

    fs.access(
      `${__dirname}/../public/${req.body.type}/${
        req.body.image.split(".")[0]
      }.svg`,
      fs.constants.F_OK,
      async (err) => {
        if (err) {
          const response = await axios({
            method: "get",
            url: `${process.env.STORED_CHARTS_SERVICE}/${req.body.type}/${req.body.image}`,
            responseType: "arraybuffer",
          });

          req.image = response.data;
          next();
        } else {
          res.set("Content-Type", "image/svg+xml");
          res.set(
            "Content-Disposition",
            `attachment; filename="${req.body.image.split(".")[0]}.svg"`
          );

          return fs
            .createReadStream(
              `${__dirname}/../public/${req.body.type}/${
                req.body.image.split(".")[0]
              }.svg`
            )
            .pipe(res);
        }
      }
    );
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        status: "failed",
        message: err.response.data.message,
      });
    }
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
