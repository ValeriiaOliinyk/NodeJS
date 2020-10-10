const multer = require("multer");

const imageUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/public/images");
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user}.jpg`);
    },
  });

  return multer({ storage }).single("image");
};

module.exports = {
  imageUploaderMiddleware: imageUploader(),
};
